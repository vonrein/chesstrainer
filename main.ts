
import { Chessground} from 'chessground';
import { Config as CgConfig} from 'chessground/config'
import type { Key } from 'chessground/types';
import type { UiHandles} from './uiHandles';
import { secondsToMinutes } from './uiHandles';
import {applyTheme} from "./theme"

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

const ui: UiHandles = {
  container,
  boardWrapper,
  scoreDisplay,
  timeDisplay,
  rateDisplay,
  updateDisplays: (score, elapsedMs) => {
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    const rate = elapsedSeconds > 0 ? (score / (elapsedSeconds / 30)).toFixed(2) : '0';
    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time: ${secondsToMinutes(elapsedSeconds)}`;
    rateDisplay.textContent = `Points per half minute: ${rate}`;
  },
  updateOverlay: (current, next) => {
    coordsOverlay.innerHTML = `
      <svg viewBox="0 0 100 100" class="coords-svg">
        <g class="current">
          <text x="25" y="20">${current}</text>
        </g>
        <g class="next">
          <text x="25" y="25">${next}</text>
        </g>
      </svg>`;
  },
  zoom: delta => {
    zoomLevel = Math.min(Math.max(zoomLevel + delta, 0.5), 2.0);
    boardWrapper.style.transform = `scale(${zoomLevel})`;
    boardWrapper.style.transformOrigin = 'top center';
  },
};

zoomInBtn.addEventListener('click', () => ui.zoom(0.1));
zoomOutBtn.addEventListener('click', () => ui.zoom(-0.1));

// --- Game Mode Types & System ---
type GameMode = 'coordinates' | 'speed';

interface GameModeConfig {
  name: GameMode;
  init(ui: UiHandles): void;
  handleClick(key: Key, ui: UiHandles): void;
  reset(ui: UiHandles): void;
  renderOverlay(ui: UiHandles): void;
  getScore(): number;
}

const config : CgConfig= {
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
    select: key => currentMode.handleClick(key, ui),
  },
}

let ground = Chessground(container, config);

function startTimer() {
  timerInterval = window.setInterval(() => ui.updateDisplays(currentMode.getScore(), Date.now() - startTime), 1000);
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
  init(ui) {
    coordScore = 0;
    coordCurrent = randomSquare();
    coordNext = randomSquare(coordCurrent);
    ui.updateDisplays(coordScore, 0);
    ui.updateOverlay(coordCurrent, coordNext);
  },
  handleClick(key, ui) {
    if (key === coordCurrent) {
      coordScore++;
      ui.updateDisplays(coordScore, Date.now() - startTime);
      coordCurrent = coordNext;
      coordNext = randomSquare(coordCurrent);
      ui.updateOverlay(coordCurrent, coordNext);
    } else {
      console.log('❌ Wrong!', key);
    }
  },
  reset(ui) {
    startTime = Date.now();
    this.init(ui);
  },
  renderOverlay(ui) {
    ui.updateOverlay(coordCurrent, coordNext);
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
  init(ui) {
    speedList = [];
    for (const f of files) for (const r of ranks) speedList.push((f + r) as Key);
    for (let i = speedList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [speedList[i], speedList[j]] = [speedList[j], speedList[i]];
    }
    speedScore = 0;
    speedCurrent = speedList.shift()!;
    ui.updateDisplays(speedScore, 0);
    ui.updateOverlay(speedCurrent, speedList[0] ?? '');
  },
  handleClick(key, ui) {
    if (key === speedCurrent) {
      speedScore++;
      ui.updateDisplays(speedScore, Date.now() - startTime);
      if (speedList.length === 0) {
        alert(`✅ Done! Time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
        this.reset(ui);
        return;
      }
      speedCurrent = speedList.shift()!;
      ui.updateOverlay(speedCurrent, speedList[0] ?? '');
    }
  },
  reset(ui) {
    startTime = Date.now();
    this.init(ui);
  },
  renderOverlay(ui) {
    ui.updateOverlay(speedCurrent, speedList[0] ?? '');
  },
  getScore() {
    return speedScore;
  },
};

// --- Mode Selector ---
const selectedMode = (getQueryParam('mode') as GameMode) || 'coordinates';
const currentMode: GameModeConfig = selectedMode === 'speed' ? speedMode : coordinatesMode;

resetBtn.addEventListener('click', () => currentMode.reset(ui));
toggleOrientationBtn.addEventListener('click', () => {
  orientation = orientation === 'white' ? 'black' : 'white';
  ground.set({ orientation });
});

currentMode.init(ui);
startTimer();




document.head.appendChild(applyTheme(document.getElementById('board')!))

let themeChanged = false
let flipped = false
document.addEventListener("keydown",(e)=>{
  if(e.key == "f" &&!flipped){
    flipped = false
    orientation = orientation === 'white' ? 'black' : 'white';
    ground.set({ orientation });
  }
	if(e.key == "c" && !themeChanged){
		themeChanged = true
		document.querySelector("#themeStyles")!.remove()
		document.head.appendChild(applyTheme(document.getElementById('board')!))
		
		
	}
	
	})
document.addEventListener("keyup",(e)=>{
	flipped = false
	themeChanged = false
	
	
	})
