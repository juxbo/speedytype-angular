import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppInputEvent } from '../interfaces/inputEvent';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  resetEmitter: EventEmitter<boolean>;
  submitEmitter: EventEmitter<boolean>;
  gameService: GameService;
  constructor(private _gameService: GameService) {
    this.gameService = _gameService;

    this.submitEmitter = new EventEmitter<boolean>();
    this.gameService.submitEmitter = this.submitEmitter;
    this.resetEmitter = new EventEmitter<boolean>();
    this.startGame({});
  }

  ngOnInit(): void {}

  startGame = (event: any) => {
    this.resetEmitter.emit(true);
    this.gameService.startGame();
  };

  enteredText = (event: AppInputEvent) => {
    this.gameService.enterText(event);
  };

  isGameRunning = () => {
    return this.gameService.isRunning();
  }
}
