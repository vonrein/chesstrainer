import { Chess } from 'chess.js'
import { Chessground } from 'chessground'
import { Config } from 'chessground/config'
import { randomTheme } from './randomTheme'
import { computeDests,getTurnColor,parseUCIMove,promoteAble } from './chessUtils'

const container = document.getElementById('board')!
const params = new URLSearchParams(window.location.search)
const max = params.get('max') ?? '4000'
const min = params.get('min') ?? '100'
const limit = params.get('limit') ?? '1'
const sort = params.get('sort') ?? ''
const theme = params.get('theme') ?? ''
const optionalQueryString = (sort != ''?'&sort=1':'')+(theme != ''?'&theme='+theme:'')

const id = params.get('id')
type SourceType = "storm" | "streak" | "local";

const rawSource = params.get("source");
const source: SourceType = (rawSource === "storm" || rawSource === "streak" || rawSource === "local")
  ? rawSource
  : "local";


const query = id != null
  ? `id=${id}`
  : `max=${max}&min=${min}&limit=${limit}${optionalQueryString}`


let chess = new Chess()
let moveQueue: string[] = []
let ground: ReturnType<typeof Chessground>
let playerColor: 'white' | 'black'
let activePuzzle = false
let puzzleURL = ''
let puzzleQueue: any[] = []
let initialPuzzleCount = 0
let mistake = false

const composeGlyph = (fill: string, path: string) =>
  `<defs><filter id="shadow"><feDropShadow dx="4" dy="7" stdDeviation="5" flood-opacity="0.5" /></filter></defs><g transform="translate(71 -12) scale(0.4)"><circle style="fill:${fill};filter:url(#shadow)" cx="50" cy="50" r="50" />${path}</g>`;

const goodmoveSVG = `<path fill="#fff" d="M87 32.8q0 2-1.4 3.2L51 70.6 44.6 77q-1.7 1.3-3.4 1.3-1.8 0-3.1-1.3L14.3 53.3Q13 52 13 50q0-2 1.3-3.2l6.4-6.5Q22.4 39 24 39q1.9 0 3.2 1.3l14 14L72.7 23q1.3-1.3 3.2-1.3 1.6 0 3.3 1.3l6.4 6.5q1.3 1.4 1.3 3.4z"/>`
const wrongMoveSVG = `    '<path fill="#fff" d="M79.4 68q0 1.8-1.4 3.2l-6.7 6.7q-1.4 1.4-3.5 1.4-1.9 0-3.3-1.4L50 63.4 35.5 78q-1.4 1.4-3.3 1.4-2 0-3.5-1.4L22 71.2q-1.4-1.4-1.4-3.3 0-1.7 1.4-3.5L36.5 50 22 35.4Q20.6 34 20.6 32q0-1.7 1.4-3.5l6.7-6.5q1.2-1.4 3.5-1.4 2 0 3.3 1.4L50 36.6 64.5 22q1.2-1.4 3.3-1.4 2.3 0 3.5 1.4l6.7 6.5q1.4 1.8 1.4 3.5 0 2-1.4 3.3L63.5 49.9 78 64.4q1.4 1.8 1.4 3.5z"/>'`

const glyphToSvg = {
	'✓': {html:composeGlyph('#22ac38',goodmoveSVG)},
	'✗': {html:composeGlyph('#df5353',wrongMoveSVG)}
	
}

// 1) Initialize Chessground once
function initGround() {
  ground = Chessground(
    container,
    {
      fen: '',
      orientation: 'white',
      viewOnly: false,
      highlight: { lastMove: true, check: true },
      check:chess.isCheck(),
      animation: { enabled: true, duration: 200 },
      draggable: { showGhost: true },
      movable: { free: false, color: 'white', dests: new Map<Key, Key[]>() },
      premovable: {enabled:true},
      events: {},
      drawable: {
    enabled: true,
    visible: true,
    autoShapes: [],
    shapes: []
  }
    }
  )
  
}
initGround()


// 3) Central updater with default empty options
function updateGround(options: Partial<Config> = {}) {
  ground.set({
    fen: chess.fen(),
    orientation: playerColor,
    turnColor: getTurnColor(chess.turn()),
    check:chess.isCheck(),
    movable: { color: playerColor, dests: computeDests(chess), free: false },
    events: {},
    ...options
  })
}

// Status display
function showStatus(msg: string = "",pzInfo:string = "") {
  if(msg != "") document.getElementById('status')!.textContent = msg
  if(pzInfo !="") document.getElementById('puzzleInfo')!.textContent = pzInfo
}

// 4) Parse UCI moves


// 5) Execute moves on chess.js and Chessground
function makeMove(uci: string, quiet = false) {
  
  const { from, to, promotion } = parseUCIMove(chess,uci)
  chess.move(parseUCIMove(chess,uci))
  if (!quiet) ground.move(from, to)
  updateGround()
}

// 6) Load puzzle data
async function loadPuzzles() {
  let puzzleSourceURL: string =
    source === "local"
      ? `http://localhost:5000/api/puzzles?${query}`
      : `https://lichess.org/api/${source}`;

  try {
    const response = await fetch(puzzleSourceURL);
    const data = await response.json();
    let puzzles: any[] = [];
    let initialPuzzleCount: number;

    if (source === "storm") {
      puzzles = data.puzzles.map((obj: any) => ({
        ...obj,
        moves: obj.line
      }
      ));
      initialPuzzleCount = puzzles.length;
    } else if (source === "streak") {
      const streakIds = data.streak.split(" ");
      if (!streakIds.length) {
        showStatus("No puzzles found!");
        return;
      }

      const streakResponse = await fetch(
        `http://localhost:5000/api/streak?ids=${streakIds.join(",")}`
      );
      puzzles = await streakResponse.json();
      initialPuzzleCount = streakIds.length;
    } else {
      puzzles = data;
      initialPuzzleCount = puzzles.length;
    }

    if (!puzzles.length) {
      showStatus("No puzzles found!");
      return;
    }

    puzzleQueue = puzzles;
    showStatus("", `${initialPuzzleCount} puzzles loaded.`);
    loadNextPuzzle();
  } catch (error) {
    console.error("Error loading puzzles:", error);
    showStatus("Error loading puzzles!");
  }
}

//load next puzzle from queue
function loadNextPuzzle() {
  mistake = false
  if (!puzzleQueue.length) {
    showStatus("",'All puzzles solved! 🎉')
    return
  }

  const p = puzzleQueue.shift()
  console.log(p)
  activePuzzle = true
  puzzleURL = 'https://lichess.org/training/' + p.id
  chess.load(p.fen)
  moveQueue = p.moves.split(' ')
  startPuzzle(p.fen, moveQueue.shift()!)
  showStatus("",`Puzzle rating: ${p.rating} (${puzzleQueue.length} left)`)
}

// 7) Begin puzzle sequence
function startPuzzle(initFen: string, oppUci: string) {
  chess.load(initFen)
  playerColor = initFen.split(' ')[1] === 'w' ? 'black' : 'white'
  updateGround({ fen: initFen, orientation: playerColor, viewOnly: false, events: {move:()=>null}})

  setTimeout(() => {
    makeMove(oppUci, false)
    playerColor = getTurnColor(chess.turn())
    updateGround({ events: { move: onUserMove } })
    //showStatus(`${playerColor} to move`)
  }, 500)
}

// 8) Handle player's move
function onUserMove(from: string, to: string) {
  if (!activePuzzle) return false
  const expected = moveQueue[0]!
  const uci = from + to + (promoteAble(chess,undefined, from, to) ?? '')
  //chess.move({ from, to, promotion: promoteAble(chess, undefined, from, to) })
  makeMove(uci,false)


  if (uci !== expected && !chess.isGameOver()) {
    showStatus('❌ Wrong move')
    mistake = true
    setTimeout(()=>{
      chess.undo()
      updateGround()
    },500)
    
    return false
  }

  ground.setAutoShapes([
        { orig: moveQueue[0].slice(2,4), customSvg: glyphToSvg["✓"]},
      ]);

  moveQueue.shift()
  showStatus(moveQueue.length ? '✅ Correct, go on!' : '✅ Puzzle complete!')
  updateGround({ events: {} })
  

  if (!moveQueue.length || chess.isGameOver()) {
    activePuzzle = false
    showStatus(`✅ Puzzle complete! URL: <a href="${puzzleURL}">${mistake?"❌":"✅"}</a>`)
    
    setTimeout(() => {
      loadNextPuzzle()
    }, 1000)
  
    return false
  }
  
  updateGround({events: {move:()=>null}})
  setTimeout(() => {
    makeMove(moveQueue.shift()!, false)
    ground.setAutoShapes([]);
    playerColor = chess.turn() === 'w' ? 'white' : 'black'
    updateGround({ events: { move: onUserMove } })
  }, 500)

  return true
}



document.getElementById('loadPuzzleBtn')!.addEventListener('click', async () => {
  await loadPuzzles();
})
//document.getElementById('board')!.classList.add('merida')

document.head.appendChild(randomTheme(container))

let themeChanged = false
document.addEventListener("keydown",(e)=>{
	if(e.key == "c" && !themeChanged){
		themeChanged = true
		document.querySelector("#themeStyles")!.remove()
		document.head.appendChild(randomTheme(document.getElementById('board')!))
		
		
	}
	
	})
document.addEventListener("keyup",(e)=>{
	
	themeChanged = false
	
	
	})
