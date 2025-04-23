import { Chess } from 'chess.js'
import { SQUARES, Key } from 'chess.js'
import { Chessground, Config } from 'chessground'

// URL query setup
const params = new URLSearchParams(window.location.search)
const lt = params.get('lt') ?? '1600'
const gt = params.get('gt') ?? '1000'
const limit = params.get('limit') ?? '1'
const theme = params.get('theme') ?? ''
const id = params.get('id')
const query = id != null
  ? `id=${id}`
  : `lt=${lt}&gt=${gt}&limit=${limit}&theme=${theme}`

let chess = new Chess()
let moveQueue: string[] = []
let ground: ReturnType<typeof Chessground>
let playerColor: 'white' | 'black'
let activePuzzle = false
let puzzleURL = ''

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

// 2) Compute legal destinations
function computeDests() {
  const dests = new Map<Key, Key[]>()
  SQUARES.forEach((s) => {
    const moves = chess.moves({ square: s, verbose: true })
    if (moves.length) dests.set(s, moves.map((m) => m.to))
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

// 4) Parse UCI moves
function parseUCIMove(uci: string) {
  return { from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] }
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
    .then(([p]) => {
      activePuzzle = true
      puzzleURL = 'https://lichess.org/training/' + p.id
      chess = new Chess(p.fen)
      moveQueue = p.moves.split(' ')
      startPuzzle(p.fen, moveQueue.shift()!)
    })
}

// 7) Begin puzzle sequence
function startPuzzle(initFen: string, oppUci: string) {
  chess.load(initFen)
  playerColor = initFen.split(' ')[1] === 'w' ? 'black' : 'white'
  updateGround({ fen: initFen, orientation: playerColor, viewOnly: false })

  setTimeout(() => {
    makeMove(oppUci, true)
    playerColor = chess.turn() === 'w' ? 'white' : 'black'
    updateGround({ events: { move: onUserMove } })
    showStatus(`${playerColor} to move`)
  }, 500)
}

// 8) Handle player's move
function onUserMove(from: string, to: string) {
  if (!activePuzzle) return false
  const expected = moveQueue[0]!
  const uci = from + to + (expected[4] || '')
  chess.move({ from, to, promotion: expected[4] })

  if (uci !== expected && !chess.isGameOver()) {
    chess.undo()
    showStatus('❌ Wrong move')
    updateGround()
    return false
  }

  moveQueue.shift()
  showStatus(moveQueue.length ? '✅ Correct, go on!' : '✅ Puzzle complete!')
  updateGround({ events: {} })

  if (!moveQueue.length || chess.isGameOver()) {
    activePuzzle = false
    showStatus(puzzleURL)
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

// Status display
function showStatus(msg: string) {
  document.getElementById('status')!.textContent = msg
}

document.getElementById('loadPuzzleBtn')!.addEventListener('click', loadPuzzle)
document.getElementById('board')!.classList.add('merida')
