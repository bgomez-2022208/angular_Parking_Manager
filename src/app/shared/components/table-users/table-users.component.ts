import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface User {
  email: string;
  name: string;
}

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
})
export class TableUsersComponent {
  @Input() users: User[] = [];
  @Input() itemsPerPage: number = 8;
  @Output() pageChange = new EventEmitter<number>();

  currentPage: number = 1;

  get displayedPages(): number[] {
    const pages: number[] = [];
    const maxDisplayedPages = 3;
    let startPage = Math.max(1, this.currentPage - 1);

    for (let i = 0; i < maxDisplayedPages; i++) {
      const page = startPage + i;
      if (page <= this.totalPages) {
        pages.push(page);
      }
    }
    return pages;
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  changePage(event: Event, page: number): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}
