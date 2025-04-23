import { Chess } from 'chess.js';
import {  SQUARES } from "chess.js";
import { Chessground } from 'chessground';
import type { Config } from 'chessground/config';


const params = new URLSearchParams(window.location.search);

const lt = params.get("lt") ?? "1600";      // default to 1600
const gt = params.get("gt") ?? "1000";      // optional: lower bound
const limit = params.get("limit") ?? "1";   // default to 1
const theme = params.get("theme") ?? "";   // default to ""
const id = params.get("id")

const query = id != null ? `id=${id}`:`lt=${lt}&gt=${gt}&limit=${limit}&theme=${theme}`;

let chess: any;
let moveQueue: string[] = [];
let ground: ReturnType<typeof Chessground>;
let playerColor: 'white' | 'black';
let activePuzzle = false;
let puzzleURL: string = ""
let humanMove:boolean = true

chess = new Chess()
function clearGround() {
  humanMove = true
  
// Initialize board without any puzzle

ground = Chessground(document.getElementById('board')!, {
	fen:"",
  orientation: "white",
  highlight: {
    lastMove: true,
    check: true
  },
  animation: {
    enabled: true,
    duration: 200
  },
  movable: {
    free: false
  },
  draggable: {
        showGhost: true,
  },
  premovable: {
    enabled: false
  }
 });
 
  ground.set({
    dests: computeDests()
  })
}
clearGround()

function parseUCIMove(uci: string) {
  return {
    from: uci.slice(0, 2),
    to: uci.slice(2, 4),
    promotion: uci.length === 5 ? uci[4] : undefined
  };
}


function makeMove(uci: string, quite :boolean = false) {
  const { from, to, promotion } = parseUCIMove(uci);
  const move = chess.move({ from, to, promotion });
  if(!quite)ground.move(from, to);
  updateBoard()
  return move
}




function computeDests(): Map<Key, Key[]> {
  const dests = new Map();
  SQUARES.forEach((s) => {
    const ms = chess.moves({ square: s, verbose: true });

    if (ms.length)
      dests.set(
        s,
        ms.map((m) => m.to),
      );
  });
  return dests;
}

function toColor(): 'white' | 'black' {
  return chess.turn() === "w" ? "white" : "black";
}

function showStatus(msg: string) {
  document.getElementById('status')!.textContent = msg;
}


function loadPuzzle() {
	
  fetch(`http://localhost:5000/api/puzzles?${query}`)
    .then(res => res.json())
    .then(([puzzle]) => {
      
      activePuzzle = true;
      puzzleURL = "https://lichess.org/training/" + puzzle.id;
      console.log("🌩️ Loaded puzzle:", puzzle.id, puzzle);

      // Reset game and move queue
      chess = new Chess(puzzle.fen);
      moveQueue = puzzle.moves.split(' ');

      // Apply the opponent's move after a short delay (optional)
      const opponentMove = moveQueue.shift()!;
      startPuzzle(puzzle.fen, opponentMove)
    });
}

function startPuzzle(initFen:string, initMove: string) {
	clearGround()
	
	playerColor = initFen.split(" ")[1] === "w" ? "black" : "white";
  ground.set({
    fen: initFen,
    viewOnly: false,
    orientation: playerColor
  });
setTimeout(()=>{
	  makeMove(initMove)


  playerColor = toColor();

  ground.set({
    viewOnly: false,
    orientation: playerColor,
    turnColor: playerColor,
    movable: {
      color: playerColor,
      dests: computeDests(),
      free: false
    },
    events: {
      move(from, to) {
        if(handlePuzzle(from, to))
        
          puzzleContinue() //opponent move

      }
    }
  });

  showStatus(playerColor + " to move");
  
  },1000)
}

 function handlePuzzle (from: string, to:string) : boolean {
  if ( !activePuzzle) return false;
  console.log(1)
  console.log(moveQueue)
  

  const expected = moveQueue[0];
  const promotion = expected.length === 5 ? expected[4] : undefined;

  const userMove = from + to + (promotion ?? '');

  
  
  chess.move({from,to,promotion}) //try move first internaly

  
  
  if (userMove !== expected && !chess.isGameOver()) {
    handleIncorrect();
    showStatus("❌ Wrong move");
    return false
  }
  
  //chess.undo()
  showStatus("✅ Correct move! Go on!");
  updateBoard()
  moveQueue.shift()


  //makeMove(moveQueue.shift()!, true)

  if (chess.isGameOver() || moveQueue.length === 0) {
    showStatus("✅ Puzzle complete!");
    activePuzzle = false;
    handleCompleted();
    return false //no puzzle continuation  needed
    
  }
  ground.set({
    events: {
      move(from, to) {
        return
  
      }
    }
    })
  humanMove = false
  return true;
}

function puzzleContinue(){
  console.log(2)
  console.log(moveQueue)
  
  
  makeMove(moveQueue.shift()!, true);//opponent move
  humanMove = true

  ground.set({
  events: {
    move(from, to) {
      if(handlePuzzle(from, to))
      
        puzzleContinue() //opponent move

    }
  }
})


}



function handleIncorrect(){
	console.log("incorrect")
	chess.undo()
	ground.set({
		fen:chess.fen(),
		orientation: playerColor,
    turnColor: playerColor,
    movable: {
      color: playerColor,
      dests: computeDests(),
      free: false
    }
	})
  updateBoard()
}

function handleCompleted(){
	 showStatus(puzzleURL)
	 
	
}

function updateBoard() {
  ground.set({
    fen: chess.fen(),
    orientation: playerColor,
    turnColor: playerColor,
    movable: {
      dests: computeDests(),
      free: false
    }
  });
}



document.getElementById("board")!.classList.add("merida");
document.getElementById('loadPuzzleBtn')!.addEventListener('click', loadPuzzle);
