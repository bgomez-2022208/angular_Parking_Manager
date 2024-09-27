import { Component } from '@angular/core';

export interface User {
  email: string;
  name: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  title: string = 'Profile';

  users: User[] = [
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'Content for list item' },
    { email: 'bgomez-2022208@kinal.edu.gt', name: 'bgomez' },
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

  itemsPerPage: number = 8;
  currentPage: number = 1;

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
