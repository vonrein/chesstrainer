import { Chess } from 'chess.js'
import { SQUARES } from 'chess.js'
import { Chessground } from 'chessground'
import { Config } from 'chessground/config'
import { randomTheme } from './randomTheme'

const params = new URLSearchParams(window.location.search)
const max = params.get('min') ?? '4000'
const min = params.get('min') ?? '100'
const limit = params.get('limit') ?? '1'
const sort = params.get('sort') ?? ''
const theme = params.get('theme') ?? ''
const optionalQueryString = (sort != ''?'&sort=1':'')+(theme != ''?'&theme='+theme:'')

const id = params.get('id')
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

// 1) Initialize Chessground once
function initGround() {
  ground = Chessground(
    document.getElementById('board')!,
    {
      fen: '',
      orientation: 'white',
      viewOnly: false,
      highlight: { lastMove: true, check: true },
      animation: { enabled: true, duration: 200 },
      draggable: { showGhost: true },
      movable: { free: false, color: 'white', dests: new Map<Key, Key[]>() },
      events: {}
    }
  )
}
initGround()


// 2) Compute legal destinations. Includes even pawn moves like a7a8, that 
function computeDests() {
  const dests = new Map<Key, Key[]>()
  SQUARES.forEach((s) => {
    const moves = chess.moves({ square: s, verbose: true })
    const uniqueTos = [...new Set(moves.map((m) => m.to))]
    if (uniqueTos.length) dests.set(s, uniqueTos)
  })
  return dests
}

// 3) Central updater with default empty options
function updateGround(options: Partial<Config> = {}) {
  ground.set({
    fen: chess.fen(),
    orientation: playerColor,
    turnColor: playerColor,
    movable: { color: playerColor, dests: computeDests(), free: false },
    events: {},
    ...options
  })
}

// Status display
function showStatus(msg: string) {
  document.getElementById('status')!.textContent = msg
}
/*
**promo = one char
*/
function promoteAble(promo: string | undefined, from: string, to: string): string | undefined {
  if (promo) return promo

  const piece = chess.get(from)
  if (piece?.type === 'p') {
    const targetRank = parseInt(to[1], 10)
    const isPromotionRank = (piece.color === 'w' && targetRank === 8) || 
                            (piece.color === 'b' && targetRank === 1)

    if (isPromotionRank) {
      return 'q'
    }
  }
  return undefined
}
// 4) Parse UCI moves
function parseUCIMove(uci: string) {
  const from = uci.slice(0, 2)
  const to = uci.slice(2, 4)
  let promotion = promoteAble(uci[4], from,to)

  return { from, to, promotion }
}

// 5) Execute moves on chess.js and Chessground
function makeMove(uci: string, quiet = false) {
  const { from, to, promotion } = parseUCIMove(uci)
  chess.move({ from, to, promotion })
  if (!quiet) ground.move(from, to)
  updateGround()
}

// 6) Load puzzle data
function loadPuzzle() {
  fetch(`http://localhost:5000/api/puzzles?${query}`)
    .then((r) => r.json())
    .then((puzzles) => {
      if (!puzzles.length) {
        showStatus('No puzzles found!')
        return
      }

      puzzleQueue = puzzles
      initialPuzzleCount = puzzles.length
      showStatus(`${initialPuzzleCount} puzzles loaded.`)
      loadNextPuzzle()
    })
}

function loadNextPuzzle() {
  if (!puzzleQueue.length) {
    showStatus('All puzzles solved! 🎉')
    return
  }

  const p = puzzleQueue.shift()
  console.log(p)
  activePuzzle = true
  puzzleURL = 'https://lichess.org/training/' + p.id
  chess = new Chess(p.fen)
  moveQueue = p.moves.split(' ')
  startPuzzle(p.fen, moveQueue.shift()!)
  showStatus(`Puzzle rating: ${p.rating} (${puzzleQueue.length} left)`)
}

// 7) Begin puzzle sequence
function startPuzzle(initFen: string, oppUci: string) {
  chess.load(initFen)
  playerColor = initFen.split(' ')[1] === 'w' ? 'black' : 'white'
  updateGround({ fen: initFen, orientation: playerColor, viewOnly: false, events: {move:()=>null}})

  setTimeout(() => {
    makeMove(oppUci, false)
    playerColor = chess.turn() === 'w' ? 'white' : 'black'
    updateGround({ events: { move: onUserMove } })
    showStatus(`${playerColor} to move`)
  }, 500)
}

// 8) Handle player's move
function onUserMove(from: string, to: string) {
  if (!activePuzzle) return false
  const expected = moveQueue[0]!
  const uci = from + to + (promoteAble(undefined, from, to) ?? '')
  chess.move({ from, to, promotion: promoteAble(undefined, from, to) })


  if (uci !== expected && !chess.isGameOver()) {
    showStatus('❌ Wrong move')
    setTimeout(()=>{
      chess.undo()
      updateGround()
    },500)
    
    return false
  }

  moveQueue.shift()
  showStatus(moveQueue.length ? '✅ Correct, go on!' : '✅ Puzzle complete!')
  updateGround({ events: {} })

  if (!moveQueue.length || chess.isGameOver()) {
    activePuzzle = false
    showStatus(`✅ Puzzle complete! Difficulty: ${puzzleURL}`)
    
    setTimeout(() => {
      loadNextPuzzle()
    }, 1000)
  
    return false
  }

  setTimeout(() => {
    makeMove(moveQueue.shift()!, true)
    playerColor = chess.turn() === 'w' ? 'white' : 'black'
    updateGround({ events: { move: onUserMove } })
    showStatus(`${playerColor} to move`)
  }, 500)

  return true
}



document.getElementById('loadPuzzleBtn')!.addEventListener('click', loadPuzzle)
//document.getElementById('board')!.classList.add('merida')
randomTheme(document.getElementById('board')!)
