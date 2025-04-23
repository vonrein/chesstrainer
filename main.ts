// Refactored Coordinate Trainer with Mode Abstraction

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

const files = 'abcdefgh';
const ranks = '12345678';
type Files = typeof files[number];
type Ranks = typeof ranks[number];

let orientation: 'white' | 'black' = 'white';
let zoomLevel = 1.0;
let startTime = Date.now();
let timerInterval: number;

function getQueryParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function applyZoom() {
  boardWrapper.style.transform = `scale(${zoomLevel})`;
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

// --- Game Mode Types & System ---
type GameMode = 'coordinates' | 'speed';

interface GameModeConfig {
  name: GameMode;
  init(): void;
  handleClick(key: Key): void;
  reset(): void;
  renderOverlay(): void;
  getScore(): number;
}

// Shared state
let ground = Chessground(container, {
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
    select: key => currentMode.handleClick(key),
  },
});

function updateDisplays(score: number) {
  const elapsedMs = Date.now() - startTime;
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const rate = elapsedSeconds > 0 ? (score / (elapsedSeconds / 30)).toFixed(2) : '0';

  scoreDisplay.textContent = `Score: ${score}`;
  timeDisplay.textContent = `Time: ${elapsedSeconds}s`;
  rateDisplay.textContent = `Points per half minute: ${rate}`;
}

function startTimer() {
  timerInterval = window.setInterval(() => updateDisplays(currentMode.getScore()), 1000);
}

// --- Coordinates Mode ---
let coordScore = 0;
let coordCurrent: Key = 'a1';
let coordNext: Key = 'b2';

function randomSquare(exclude?: Key): Key {
  const squares: Key[] = [];
  for (const f of files) for (const r of ranks) squares.push((f + r) as Key);
  if (exclude) squares.splice(squares.indexOf(exclude), 1);
  return randomChoice(squares);
}

const coordinatesMode: GameModeConfig = {
  name: 'coordinates',
  init() {
    coordScore = 0;
    coordCurrent = randomSquare();
    coordNext = randomSquare(coordCurrent);
    updateDisplays(coordScore);
    this.renderOverlay();
  },
  handleClick(key: Key) {
    if (key === coordCurrent) {
      coordScore++;
      updateDisplays(coordScore);
      coordCurrent = coordNext;
      coordNext = randomSquare(coordCurrent);
      this.renderOverlay();
    } else {
      console.log('❌ Wrong!', key);
    }
  },
  reset() {
    startTime = Date.now();
    this.init();
  },
  renderOverlay() {
    coordsOverlay.innerHTML = `
      <svg viewBox="0 0 100 100" class="coords-svg">
        <g class="current">
          <text x="25" y="20">${coordCurrent}</text>
        </g>
        <g class="next">
          <text x="25" y="25">${coordNext}</text>
        </g>
      </svg>`;
  },
  getScore() {
    return coordScore;
  },
};

// --- Speed Mode ---
let speedList: Key[] = [];
let speedCurrent: Key = 'a1';
let speedScore = 0;

const speedMode: GameModeConfig = {
  name: 'speed',
  init() {
    speedList = [];
    for (const f of files) for (const r of ranks) speedList.push((f + r) as Key);
    for (let i = speedList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [speedList[i], speedList[j]] = [speedList[j], speedList[i]];
    }
    speedScore = 0;
    speedCurrent = speedList.shift()!;
    updateDisplays(speedScore);
    this.renderOverlay();
  },
  handleClick(key: Key) {
    if (key === speedCurrent) {
      speedScore++;
      updateDisplays(speedScore);
      if (speedList.length === 0) {
        alert(`✅ Done! Time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
        this.reset();
        return;
      }
      speedCurrent = speedList.shift()!;
      this.renderOverlay();
    }
  },
  reset() {
    startTime = Date.now();
    this.init();
  },
  renderOverlay() {
    coordsOverlay.innerHTML = `
      <svg viewBox="0 0 100 100" class="coords-svg">
        <g class="current">
          <text x="25" y="20">${speedCurrent}</text>
        </g>
        <g class="next">
          <text x="25" y="25">${speedList[0] ?? ''}</text>
        </g>
      </svg>`;
  },
  getScore() {
    return speedScore;
  },
};

// --- Mode Selector ---
const selectedMode = (getQueryParam('mode') as GameMode) || 'coordinates';
const currentMode: GameModeConfig = selectedMode === 'speed' ? speedMode : coordinatesMode;

resetBtn.addEventListener('click', () => currentMode.reset());
toggleOrientationBtn.addEventListener('click', () => {
  orientation = orientation === 'white' ? 'black' : 'white';
  ground.set({ orientation });
});

currentMode.init();
startTimer();
