export interface Game {
  words: string[];
  enteredText: string;
  startTs?: number;
  endTs?: number;
  isDone: boolean;
}
export interface AnalyzedGame extends Game {
  wordCount: number;
  chars: number;
  errors: number;
  accuracy: number;
  durationMs: number;
  wpm: number;
  cpm: number;
}
