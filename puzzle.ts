import { Chess } from 'chess.js'
import { Chessground } from 'chessground'
import { Api } from 'chessground/api'
import { Config } from 'chessground/config'
import { Key } from 'chessground/types'
import { applyTheme } from './theme'
import { computeDests, getTurnColor, parseUCIMove, promoteAble } from './chessUtils'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('board')!
  const params = new URLSearchParams(window.location.search)
  const max = params.get('max') ?? '4000'
  const min = params.get('min') ?? '100'
  const limit = params.get('limit') ?? '1'
  const sort = params.get('sort') ?? ''
  const theme = params.get('theme') ?? ''
  const optionalQueryString = (sort != '' ? '&sort=1' : '') + (theme != '' ? '&theme=' + theme : '')

  const id = params.get('id')
  type SourceType = "storm" | "streak" | "local";

  const rawSource = params.get("source");
  const source: SourceType = (rawSource === "storm" || rawSource === "streak" || rawSource === "local")
    ? rawSource
    : "local";

  const query = id != null
    ? `id=${id}`
    : `max=${max}&min=${min}&limit=${limit}${optionalQueryString}`

  const jumpToPuzzleContainer = document.getElementById('jump-to-puzzle-container')!;
  const jumpToPuzzleInput = document.getElementById('jump-to-puzzle') as HTMLInputElement;
  const startBtn = document.getElementById('startBtn')!;
  const jumpBtn = document.getElementById('jumpBtn')!;

  let chess = new Chess()
  let moveQueue: string[] = []
  let ground: Api
  let playerColor: 'white' | 'black'
  let activePuzzle = false
  let puzzleURL = ''
  let allPuzzles: any[] = [];
  let puzzleQueue: any[] = []
  let mistake = false

  const composeGlyph = (fill: string, path: string) =>
    `<defs><filter id="shadow"><feDropShadow dx="4" dy="7" stdDeviation="5" flood-opacity="0.5" /></filter></defs><g transform="translate(71 -12) scale(0.4)"><circle style="fill:${fill};filter:url(#shadow)" cx="50" cy="50" r="50" />${path}</g>`;

  const goodmoveSVG = `<path fill="#fff" d="M87 32.8q0 2-1.4 3.2L51 70.6 44.6 77q-1.7 1.3-3.4 1.3-1.8 0-3.1-1.3L14.3 53.3Q13 52 13 50q0-2 1.3-3.2l6.4-6.5Q22.4 39 24 39q1.9 0 3.2 1.3l14 14L72.7 23q1.3-1.3 3.2-1.3 1.6 0 3.3 1.3l6.4 6.5q1.3 1.4 1.3 3.4z"/>`
  const wrongMoveSVG = `    '<path fill="#fff" d="M79.4 68q0 1.8-1.4 3.2l-6.7 6.7q-1.4 1.4-3.5 1.4-1.9 0-3.3-1.4L50 63.4 35.5 78q-1.4 1.4-3.3 1.4-2 0-3.5-1.4L22 71.2q-1.4-1.4-1.4-3.3 0-1.7 1.4-3.5L36.5 50 22 35.4Q20.6 34 20.6 32q0-1.7 1.4-3.5l6.7-6.5q1.2-1.4 3.5-1.4 2 0 3.3 1.4L50 36.6 64.5 22q1.2-1.4 3.3-1.4 2.3 0 3.5 1.4l6.7 6.5q1.4 1.8 1.4 3.5 0 2-1.4 3.3L63.5 49.9 78 64.4q1.4 1.8 1.4 3.5z"/>'`

  const glyphToSvg = {
    '✓': { html: composeGlyph('#22ac38', goodmoveSVG) },
    '✗': { html: composeGlyph('#df5353', wrongMoveSVG) }
  };

  function initGround() {
    ground = Chessground(
      container,
      {
        fen: '',
        orientation: 'white',
        viewOnly: false,
        highlight: { lastMove: true, check: true },
        check: chess.isCheck(),
        animation: { enabled: true, duration: 200 },
        draggable: { showGhost: true },
        movable: { free: false, color: 'white', dests: new Map<Key, Key[]>() },
        premovable: { enabled: true },
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

  function updateGround(options: Partial<Config> = {}) {
    ground.set({
      fen: chess.fen(),
      orientation: playerColor,
      turnColor: getTurnColor(chess.turn()),
      check: chess.isCheck(),
      movable: { color: playerColor, dests: computeDests(chess), free: false },
      events: {},
      ...options
    })
  }

  function showStatus(msg: string = "", pzInfo: string = "") {
    if (msg != "") document.getElementById('status')!.innerHTML = msg
    if (pzInfo != "") document.getElementById('puzzleInfo')!.textContent = pzInfo
  }

  function makeMove(uci: string, quiet = false) {
    const { from, to } = parseUCIMove(chess, uci)
    chess.move(parseUCIMove(chess, uci))
    if (!quiet) ground.move(from, to)
    updateGround()
  }

  async function loadPuzzles() {
    const puzzleSourceURL: string =
      source === "local"
        ? `http://localhost:5000/api/puzzles?${query}`
        : `https://lichess.org/api/${source}`;
    try {
      const response = await fetch(puzzleSourceURL);
      const data = await response.json();
      let puzzles: any[] = [];
      let initialPuzzleCount: number;

      if (source === "storm") {
        puzzles = data.puzzles.map((p: any) => ({
          id: p.id,
          rating: p.rating,
          fen: p.fen,
          moves: p.line,
          themes: p.themes || []
        }));
        initialPuzzleCount = puzzles.length;
      } else if (source === "streak") {
        const streakIds = data.streak.split(" ");
        if (!streakIds.length) {
          showStatus("No puzzles found!");
          return;
        }
        puzzles = streakIds;
        initialPuzzleCount = streakIds.length;
      } else {
        puzzles = data;
        initialPuzzleCount = puzzles.length;
      }

      if (!puzzles.length) {
        showStatus("No puzzles found!");
        return;
      }

      allPuzzles = puzzles;
      puzzleQueue = [...allPuzzles];
      jumpToPuzzleContainer.style.display = 'inline-block';
      jumpToPuzzleInput.max = allPuzzles.length.toString();
      showStatus("", `${initialPuzzleCount} puzzles loaded.`);
      loadNextPuzzle();
    } catch (error) {
      console.error("Error loading puzzles:", error);
      showStatus("Error loading puzzles!");
    }
  }

  function jumpToPuzzle() {
    const puzzleNumber = parseInt(jumpToPuzzleInput.value, 10);
    if (isNaN(puzzleNumber) || puzzleNumber < 1 || puzzleNumber > allPuzzles.length) {
      showStatus("Invalid puzzle number!");
      return;
    }
    puzzleQueue = allPuzzles.slice(puzzleNumber - 1);
    loadNextPuzzle();
  }

  async function loadNextPuzzle() {
    mistake = false;
    if (!puzzleQueue.length) {
      showStatus("", "All puzzles solved! 🎉");
      return;
    }

    let nextItem = puzzleQueue.shift();
    let p;
    let isStreakPuzzle = false;

    if (typeof nextItem === "string") {
      isStreakPuzzle = true;
      const puzzleId = nextItem;
      showStatus("", `Loading puzzle ${puzzleId}... (${puzzleQueue.length} left)`);

      try {
        const response = await fetch(`https://lichess.org/api/puzzle/${puzzleId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawPuzzle = await response.json();
        const puzzleChess = new Chess();
        puzzleChess.loadPgn(rawPuzzle.game.pgn);
        const history = puzzleChess.history({ verbose: true });
        const lastMove = history[history.length - 1];
        puzzleChess.undo();

        p = {
          id: rawPuzzle.puzzle.id,
          rating: rawPuzzle.puzzle.rating,
          fen: puzzleChess.fen(),
          lastMove: lastMove,
          moves: rawPuzzle.puzzle.solution.join(" "),
          themes: rawPuzzle.puzzle.themes,
        };
      } catch (error) {
        console.error(`Error loading puzzle ${puzzleId}:`, error);
        showStatus("Error loading next puzzle, skipping.");
        setTimeout(loadNextPuzzle, 500);
        return;
      }
    } else {
      p = nextItem;
    }

    activePuzzle = true;
    puzzleURL = "https://lichess.org/training/" + p.id;
    chess.load(p.fen);
    moveQueue = p.moves.split(" ");

    if (isStreakPuzzle) {
      startPuzzle(p.fen, p.lastMove);
    } else {
      startPuzzle(p.fen, moveQueue.shift()!);
    }

    showStatus("", `Puzzle rating: ${p.rating} (${puzzleQueue.length} left)`);
  }

  function startPuzzle(initFen: string, oppMove: any) {
    chess.load(initFen);
    playerColor = initFen.split(" ")[1] === "w" ? "black" : "white";

    updateGround({
      fen: initFen,
      orientation: playerColor,
      viewOnly: false,
      events: { move: () => null },
    });
    ground.setAutoShapes([]);

    setTimeout(() => {
      if (typeof oppMove === "string") {
        makeMove(oppMove, false);
      } else {
        chess.move(oppMove);
        ground.move(oppMove.from, oppMove.to);
      }

      playerColor = getTurnColor(chess.turn());
      updateGround({ events: { move: onUserMove } });
    }, 500);
  }

  function onUserMove(from: Key, to: Key) {
    if (!activePuzzle) return false
    const expected = moveQueue[0]!
    const uci = from + to + (promoteAble(chess, undefined, from, to) ?? '')
    makeMove(uci, false)

    if (uci !== expected && !chess.isGameOver()) {
      showStatus('❌ Wrong move')
      mistake = true;
      ground.setAutoShapes([{ orig: to, customSvg: glyphToSvg['✗'] }])
      setTimeout(() => {
        chess.undo()
        updateGround()
        ground.setAutoShapes([])
      }, 500)
      return false
    }

    ground.setAutoShapes([
      { orig: to, customSvg: glyphToSvg['✓'] },
    ]);

    moveQueue.shift()
    showStatus(moveQueue.length ? '✅ Correct, go on!' : '✅ Puzzle complete!')
    updateGround({ events: {} })

    if (!moveQueue.length || chess.isGameOver()) {
      activePuzzle = false
      showStatus(`✅ Puzzle complete! URL: <a href="${puzzleURL}" target="_blank">${mistake ? "❌" : "✅"}</a>`)
      setTimeout(() => {
        loadNextPuzzle()
      }, 1000)
      return false
    }

    updateGround({ events: { move: () => null } })
    setTimeout(() => {
      makeMove(moveQueue.shift()!, false)
      ground.setAutoShapes([]);
      playerColor = chess.turn() === 'w' ? 'white' : 'black'
      updateGround({ events: { move: onUserMove } })
    }, 500)
    return true
  }

  startBtn.addEventListener('click', async () => {
    await loadPuzzles();
  })

  jumpBtn.addEventListener('click', () => {
    jumpToPuzzle();
  })

  document.head.appendChild(applyTheme(container))

  let themeChanged = false
  document.addEventListener("keydown", (e) => {
    if (e.key == "c" && !themeChanged) {
      themeChanged = true
      document.querySelector("#themeStyles")!.remove()
      document.head.appendChild(applyTheme(document.getElementById('board')!))
    }
  })
  document.addEventListener("keyup", (e) => {
    themeChanged = false
  })
});