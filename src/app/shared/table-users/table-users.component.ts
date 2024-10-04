import { Component, Input, Output, EventEmitter } from '@angular/core';
import {User} from "../../admin/model/user.model";
import {ApiUserService} from "../../admin/services/user.service";


@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
})
export class TableUsersComponent {
  @Input() users: User[] = [];
  @Input() itemsPerPage: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Input() totalPages: number = 0;

  constructor(private apiUserService: ApiUserService) {}



  currentPage: number = 1;

  get displayedPages(): number[] {
    const pages: number[] = [];
    const maxDisplayedPages = 3;
    let startPage = Math.max(1, this.currentPage - 3);

    for (let i = 0; i < maxDisplayedPages; i++) {
      const page = startPage + i;
      if (page <= this.totalPages) {
        pages.push(page);
      }
    }
    return pages;
  }

  changePage(event: Event, page: number): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  deleteUser(userId: number): void {
    this.apiUserService.deleteUser(userId).subscribe(

      (response: any) => {
        console.log('Usuario eliminado con éxito', response);


        this.pageChange.emit(this.currentPage);


      },
      (error: any) => {
        console.error('Error al eliminar el usuario', error);
      }
    );
  }


}
