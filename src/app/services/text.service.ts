import { Injectable } from "@angular/core";
import { words } from "./words";

@Injectable({
  providedIn: "root",
})
export class TextService {
  constructor() {}

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  generateText = (wordCount: number) => {
    let text = [];
    for (let i = 0; i < wordCount; i++) {
      text.push(words[this.getRandomInt(words.length)]);
    }
    return text;
  };
}
