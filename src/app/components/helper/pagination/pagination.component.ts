import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Output() paginationChanged = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
  pageChanged(event) {
    this.currentPage = event;
    this.paginationChanged.emit(this.currentPage);
  }
}
