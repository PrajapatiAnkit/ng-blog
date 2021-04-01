import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter-box',
  templateUrl: './counter-box.component.html',
  styleUrls: ['./counter-box.component.css'],
})
export class CounterBoxComponent implements OnInit {
  @Input() boxTitle: string;
  @Input() boxCounter: string;
  @Input() actionMsg: string;
  constructor() {}

  ngOnInit(): void {}
}
