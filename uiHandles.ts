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
export function secondsToMinutes(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
