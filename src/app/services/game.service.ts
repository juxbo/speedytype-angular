import { EventEmitter, Injectable } from '@angular/core';
import { Game, AnalyzedGame } from '../interfaces/game';
import { AppInputEvent, DELETE_KEY } from '../interfaces/inputEvent';
import { TextService } from './text.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  pastGames: AnalyzedGame[] = [];
  currentGame: Game;
  submitEmitter: EventEmitter<boolean>;

  currentWord = '';
  currentInputWord = '';
  currentWordReset = false;
  currentIndex = 0;
  showPreview = true;

  textService: TextService;

  constructor(private _textService: TextService) {
    this.textService = _textService;
  }

  startGame = () => {
    const text = this.textService.generateText(30);
    const game = {
      words: text,
      enteredText: '',
      isDone: false,
    };
    this.currentIndex = 0;
    this.currentWordReset = false;
    this.currentGame = game;
    this.currentWord = text[0];
    this.currentInputWord = '';
    this.showPreview = true;
  };

  wordsToString = (arr: Array<string>) => {
    return arr.join(' ');
  };

  getNextWords = () => {
    if (this.showPreview) {
      return this.wordsToString(this.currentGame.words.slice(1));
    }
    // TODO: Configureable word preview count
    return this.wordsToString(this.getNextWordPreview(6));
  };

  getNextWordPreview = (count = 1) => {
    return this.currentGame.words.slice(
      this.currentIndex + 1,
      this.currentIndex + count + 1
    );
  };

  getWordToType = () => {
    return this.currentWord;
  };

  nextWord = () => {
    this.submitEmitter.emit(true);
    this.currentWordReset = false;
    this.currentGame.enteredText += this.currentInputWord;
    this.currentInputWord = '';
    this.currentIndex += 1;
    this.currentWord = this.currentGame.words[this.currentIndex];
  };

  enterText = (event: AppInputEvent) => {
    if(!this.isRunning()) {
      this.currentGame.startTs = Date.now();
    }

    if (this.showPreview) {
      this.showPreview = false;
    }

    // Set current word input
    this.currentInputWord = event.text;

    // Winning condition check
    if (
      this.currentIndex == this.currentGame.words.length - 1 &&
      !this.currentWordReset &&
      (this.currentInputWord == this.currentWord || event.lastKey === ' ')
    ) {
      this.nextWord();
      this.endGame();
    }

    // Display next word
    if (event.lastKey === ' ') {
      this.nextWord();
    }
  };

  isRunning = () => {
    return !!(this.currentGame.startTs && !this.currentGame.endTs);
  }

  endGame = () => {
    const game = this.currentGame;

    if(!this.isRunning()) {
      console.warn("Game has not started yet.")
    }

    game.endTs = Date.now();
    game.isDone = true;

    const duration = game.endTs - (game.startTs? game.startTs : 0);
    const wordCount = game.words.length;
    const charCount = game.enteredText.length; //game.words.map(word => word.length).reduce((sum,x) => sum+=x) + game.words.length - 1;
    const cpm = charCount / (duration/60000);

    const inputArray = game.enteredText.split(" ");
    const errorCount = game.words.map((word, index) => word === inputArray[index]).filter(notEqual => !notEqual).length;

    const analyzed:AnalyzedGame = {...game,
      durationMs: duration,
      wordCount: wordCount,
      chars: charCount,
      errors: errorCount,
      accuracy: 1 - errorCount/wordCount, 
      cpm: cpm,
      wpm: cpm / 5,
    };

    if (analyzed) this.pastGames.push(analyzed);
  };
}
