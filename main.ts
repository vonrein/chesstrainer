// Minimal Chessground-based Coordinate Trainer (TypeScript)
// Dependencies: chessground (npm install chessground)

import { Chessground, type Config as CgConfig } from 'chessground';
import type { Key } from 'chessground/types';

const container = document.getElementById('board')!;
const scoreDisplay = document.getElementById('scoreDisplay')!;
const timeDisplay = document.getElementById('timeDisplay')!;
const rateDisplay = document.getElementById('rateDisplay')!;
const resetBtn = document.getElementById('resetBtn')!;
const toggleOrientationBtn = document.getElementById('toggleOrientationBtn')!;
const coordsOverlay = document.getElementById('coords-overlay')!;
const zoomInBtn = document.getElementById('zoomInBtn')!;
const zoomOutBtn = document.getElementById('zoomOutBtn')!;
const boardWrapper = document.getElementById('board-wrapper')!;

let startTime = Date.now();
let timerInterval: number;
let orientation: 'white' | 'black' = 'white';
let zoomLevel = 1.0;

let score = 0;

const files = 'abcdefgh';
const ranks = '12345678';
type Files = typeof files[number];
type Ranks = typeof ranks[number];

function randomChoice(max: number): number {
  return Math.floor(Math.random() * max);
}

function newKey(oldKey: Key | '', selectedFiles?: Set<Files>, selectedRanks?: Set<Ranks>): Key {
  const rand = randomChoice(2);
  let f = files.split('') as Files[];
  let r = ranks.split('') as Ranks[];

  if (selectedFiles?.size) f = f.filter(x => selectedFiles.has(x));
  if (selectedRanks?.size) r = r.filter(x => selectedRanks.has(x));

  if (oldKey) {
    if (f.length > 1 && rand === 0) f = f.filter(x => x !== oldKey[0]);
    if (r.length > 1 && rand === 1) r = r.filter(x => x !== oldKey[1]);
  }

  return (f[randomChoice(f.length)] + r[randomChoice(r.length)]) as Key;
}

function targetSvg(target: 'current' | 'next'): string {
  return `
    <g transform="translate(50, 50)">
      <rect class="${target}-target" fill="none" stroke-width="10" x="-50" y="-50" width="100" height="100" rx="5" />
    </g>`;
}

function updateTextOverlay() {
  coordsOverlay.innerHTML = `
    <svg viewBox="0 0 100 100" class="coords-svg">
      <g class="current">
        <text x="25" y="20">${currentKey}</text>
      </g>
      <g class="next">
        <text x="25" y="25">${nextKey}</text>
      </g>
    </svg>
  `;
}

let currentKey: Key;
let nextKey: Key;
/*
function updateCoordDisplay() {
  coordDisplay.textContent = `Current: ${currentKey} | Next: ${nextKey}`;
}*/

function updateBoardHighlight(ground: ReturnType<typeof Chessground>) {
  /*ground.setShapes([
    { orig: currentKey, customSvg: { html: targetSvg('current') } },
    { orig: nextKey, customSvg: { html: targetSvg('next') } },
  ]);*/
  //updateCoordDisplay();
  updateTextOverlay();
}

function updateDisplays() {
  const elapsedMs = Date.now() - startTime;
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const rate = elapsedSeconds > 0 ? (score / (elapsedSeconds / 30)).toFixed(2) : '0';

  scoreDisplay.textContent = `Score: ${score}`;
  timeDisplay.textContent = `Time: ${elapsedSeconds}s`;
  rateDisplay.textContent = `Points per half minute: ${rate}`;
}

function startTimer() {
  timerInterval = window.setInterval(updateDisplays, 1000);
}

function applyZoom() {
  const scale = zoomLevel;
  boardWrapper.style.transform = `scale(${scale})`;
  boardWrapper.style.transformOrigin = 'top center';
}

zoomInBtn.addEventListener('click', () => {
  zoomLevel = Math.min(zoomLevel + 0.1, 2.0);
  applyZoom();
});

zoomOutBtn.addEventListener('click', () => {
  zoomLevel = Math.max(zoomLevel - 0.1, 0.5);
  applyZoom();
});

const config: CgConfig = {
  orientation,
  fen: '8/8/8/8/8/8/8/8',
  coordinates: true,
  coordinatesOnSquares: false,
  blockTouchScroll: true,
  movable: { free: false, color: undefined },
  draggable: { enabled: false },
  selectable: { enabled: false },
  drawable: { enabled: false },
  events: {
    select: (key: Key) => {
      if (key === currentKey) {
        handleCorrect();
      } else {
        console.log('❌ Wrong!', key);
      }
    },
  },
};

const ground = Chessground(container, config);

function advanceCoordinates() {
  currentKey = nextKey;
  nextKey = newKey(currentKey);
  updateBoardHighlight(ground);
}

function handleCorrect() {
  score++;
  updateDisplays();
  advanceCoordinates();
}

function resetTrainer() {
  score = 0;
  startTime = Date.now();
  currentKey = newKey('');
  nextKey = newKey(currentKey);
  updateDisplays();
  updateBoardHighlight(ground);
}

resetBtn.addEventListener('click', resetTrainer);

toggleOrientationBtn.addEventListener('click', () => {
  orientation = orientation === 'white' ? 'black' : 'white';
  ground.set({ orientation });
});

resetTrainer();
startTimer();
