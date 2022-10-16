import { Component, EventEmitter, Input, OnInit } from '@angular/core';

interface InputChar {
  char: string;
  correctness: boolean;
}

@Component({
  selector: 'app-text-preview',
  templateUrl: './text-preview.component.html',
})
export class TextPreviewComponent implements OnInit {
  @Input() currentInput: string = '';
  @Input() currentWord: string = '';
  @Input() nextWords: string = '';


  @Input() submitWord: EventEmitter<boolean>;

  constructor() {}

  ngOnInit(): void {
    if (this.submitWord) {
      this.submitWord.subscribe((_) => this.submit());
    }
  }

  submit(): void {
    // TODO: Add some transition on submit
  }

  isInputCorrect = () => {
    return this.currentWord.startsWith(this.currentInput);
  };

  getInput = () => {
    return this.currentInput;
  };

  getInputChars = () => {
    return [...this.currentInput].map((char, i) => {
      return { char: char, correct: this.currentWord.charAt(i) === char };
    });
  };

  getRemainder = () => {
    return this.currentWord.substring(this.currentInput.length);
  };
}
