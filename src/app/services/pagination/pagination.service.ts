import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyPaginationService {
  pagination: any;
  constructor() {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 10,
    };
  }
  getPagination() {
    return this.getPagination;
  }
}
