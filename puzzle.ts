import { Chess } from 'chess.js';
import { ChessInstance, SQUARES } from "chess.js";
import { Chessground } from 'chessground';
import type { Config } from 'chessground/config';


const params = new URLSearchParams(window.location.search);

const lt = params.get("lt") ?? "1600";      // default to 1600
const gt = params.get("gt") ?? "1000";      // optional: lower bound
const limit = params.get("limit") ?? "1";   // default to 1
const theme = params.get("theme") ?? "";   // default to ""

const query = `lt=${lt}&gt=${gt}&limit=${limit}&theme=${theme}`;
console.log(theme)

let chess: any;
let moveQueue: string[] = [];
let ground: ReturnType<typeof Chessground>;
let playerColor: 'white' | 'black';
let activePuzzle = false;
let puzzleURL: string = ""

chess = new Chess()
function clearGround() {
  
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
  }/*,
  sprite: {
    url: `assets/images/pieces/merida/${piece}.svg`
  }*/
 });
 
  ground.set({
    dests: computeDests()
  })
}
clearGround()


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

function toColor(): String {
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
      startPuzzle(opponentMove)
    });
}

function startPuzzle(initMove: string) {
	clearGround()
  ground.set({
    fen: chess.fen(),
    viewOnly: false,
    orientation: chess.turn() ==="w"?"black":"white",
    turnColor: 'white'
  });
setTimeout(()=>{
	  chess.move(initMove);
	  ground.move(initMove.slice(0, 2), initMove.slice(2))


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
        
        handlePuzzle(from, to);
      }
    }
  });

  showStatus(playerColor + " to move");
  
  },1000)
}

/*
function handlePuzzle(from, to){
	if (!activePuzzle) return;
	
      const move = chess.move({ from, to, promotion: 'q' });
      if (!move) return showStatus("❌ Illegal move");

      const expected = moveQueue[0];
      const userMove = move.from + move.to;
      if (userMove !== expected && move.san !== expected && !chess.isGameOver()) {
        chess.undo();
        handleIncorrect();
        updateBoard()
        return showStatus("❌ Wrong move");
      }

      showStatus("✅ Correct move! Go on!");
      updateBoard()
      moveQueue.shift();

      if (chess.isGameOver() || moveQueue.length === 0) {
        showStatus("✅ Puzzle complete!");
        activePuzzle = false
        handleCompleted()
       
        
        
      } else {
        chess.move(moveQueue.shift());
      }

      updateBoard();
 }*/
 
 function handlePuzzle(from, to) {
  if (!activePuzzle) return;

  const expected = moveQueue[0];
  const promotion = expected.length === 5 ? expected[4] : undefined;

  const move = chess.move({ from, to, promotion });
  if (!move) return showStatus("❌ Illegal move");

  const userMove = move.from + move.to + (move.promotion ?? '');
  if (userMove !== expected && move.san !== expected && !chess.isGameOver()) {
    chess.undo();
    handleIncorrect();
    updateBoard();
    return showStatus("❌ Wrong move");
  }

  showStatus("✅ Correct move! Go on!");
  updateBoard();
  moveQueue.shift();

  if (chess.isGameOver() || moveQueue.length === 0) {
    showStatus("✅ Puzzle complete!");
    activePuzzle = false;
    handleCompleted();
  } else {
    const opponentMoveStr = moveQueue.shift();
    const oppFrom = opponentMoveStr.slice(0, 2);
    const oppTo = opponentMoveStr.slice(2, 4);
    const oppPromotion = opponentMoveStr.length === 5 ? opponentMoveStr[4] : undefined;

    chess.move({ from: oppFrom, to: oppTo, promotion: oppPromotion });
    //ground.move(oppFrom, oppTo);
    updateBoard()
  }

  updateBoard();
}

function handleIncorrect(){
	console.log("incorrect")
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
      color: playerColor,
      dests: computeDests(),
      free: false
    }
  });
}



document.getElementById("board")!.classList.add("merida");
document.getElementById('loadPuzzleBtn')!.addEventListener('click', loadPuzzle);
