import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AppInputEvent, DELETE_KEY } from '../interfaces/inputEvent';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
})
export class TextInputComponent implements OnInit {
  @Input() reset: EventEmitter<boolean>;
  @Input() text: string;
  @Output() onType = new EventEmitter<AppInputEvent>();

  @ViewChild('textInput', { static: false })
  InputVar: ElementRef;

  constructor() {}

  ngOnInit(): void {
    if (this.reset) {
      this.reset.subscribe((_) => this.resetInput());
    }
  }

  resetInput(): void {
    this.InputVar.nativeElement.value = '';
  }

  onTypeEvent(event: any) {
    const last = event.data;
    const custom: AppInputEvent = {
      text: event.target.value,
      lastKey: event.inputType == 'deleteContentBackward' ? DELETE_KEY : last,
    };
    this.onType.emit(custom);

    if (last === ' ') {
      this.resetInput();
    }
  }
}
