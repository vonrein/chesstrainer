import { Chess } from 'chess.js';
import { Chessground } from 'chessground';
import type { Config } from 'chessground/config';

let chess: any;
let moves: string[] = [];
let moveIndex = 0;
let ground: ReturnType<typeof Chessground>;

function computeDests() {
  const dests = new Map<string, string[]>();
  for (const file of "abcdefgh") {
    for (const rank of "12345678") {
      const square = file + rank;
      const legalMoves = chess.moves({ square, verbose: true });
      if (legalMoves.length)
        dests.set(square, legalMoves.map(m => m.to));
    }
  }
  return dests;
}

function showStatus(msg: string) {
  document.getElementById('status')!.textContent = msg;
}

function loadPuzzle() {
  fetch('http://localhost:5000/api/puzzles?rating_lt=1600&limit=1')
    .then(res => res.json())
    .then(([puzzle]) => {
      console.log("\uD83C\uDF29\uFE0F Loaded puzzle:", puzzle.id, puzzle);

      chess = new Chess(puzzle.fen);
      moves = puzzle.moves.split(' ');
      moveIndex = 0;

      chess.move(moves[moveIndex++]); // opponent's first move

      if (ground) ground.destroy();

      ground = Chessground(document.getElementById('board')!, {
        fen: chess.fen(),
        orientation: chess.turn() === 'w' ? 'white' : 'black',
        highlight: {
          lastMove: true,
          check: true
        },
        animation: {
          enabled: true,
          duration: 200
        },
        movable: {
          color: chess.turn() === 'w' ? 'white' : 'black',
          dests: computeDests(),
          free: false
        },
        sprite: {
          url: 'assets/images/pieces/merida/{piece}.svg'
        },
        events: {
          move(from, to) {
            const move = chess.move({ from, to, promotion: 'q' });
            if (!move) return showStatus("❌ Illegal move");

            const expected = moves[moveIndex++];
            const userMove = move.from + move.to;
            if (userMove !== expected && move.san !== expected) {
              showStatus("❌ Wrong move");
              return;
            }

            if (moveIndex < moves.length) {
              chess.move(moves[moveIndex++]); // next opponent move
            }

            if (chess.isGameOver()) {
              showStatus("✅ Puzzle complete!");
            } else {
              ground.set({
                fen: chess.fen(),
                movable: {
                  color: chess.turn(),
                  dests: computeDests(),
                  free: false
                }
              });
              showStatus("✓ Your move");
            }
          }
        }
      });

      showStatus("Your move");
    });
}

document.getElementById("board").classList.add("merida")//I need this to add the piece theme
document.getElementById('loadPuzzleBtn')!.addEventListener('click', loadPuzzle);
