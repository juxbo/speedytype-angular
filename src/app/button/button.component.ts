import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-button[text]",
  templateUrl: "./button.component.html",
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onClickEvent(event: any) {
    this.onClick.emit(event);
  }
}
