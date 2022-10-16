import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styles: ['.border-r-indigo-500 { border-right-color: rgb(96, 165, 250); }']
})
export class SpinnerComponent implements OnInit {
  @Input() spins:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
