export interface UiHandles {
  container: HTMLElement;
  boardWrapper: HTMLElement;
  scoreDisplay: HTMLElement;
  timeDisplay: HTMLElement;
  rateDisplay: HTMLElement;
  updateDisplays(score: number, elapsedMs: number): void;
  updateOverlay(current: string, next: string): void;
  zoom(delta: number): void;
}
