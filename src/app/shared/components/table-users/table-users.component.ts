import { Component } from '@angular/core';

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
  users: User[] = [
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'Content for list item' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'bgomez' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'Content for list item' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'hgomez' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'basilisco' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'gerson' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'sramirez' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'jgalicia' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'User 9' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'User 10' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'User 11' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'User 12' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'User 13' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'User 14' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'User 15' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'User 16' }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 8;

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}