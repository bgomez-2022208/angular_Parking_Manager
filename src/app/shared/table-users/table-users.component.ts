import { Component, Input, Output, EventEmitter } from '@angular/core';
import {User} from "../../admin/model/user.model";
import {ApiUserService} from "../../admin/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {
  DeleteUserConfirmComponent
} from "../../admin/maintenance/components/delete-user-confirm/delete-user-confirm.component";
import {Router} from "@angular/router";
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
  animations: [
    trigger('scaleFadeAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),

      transition('void => *', [
        animate('400ms ease-out')
      ])
    ])
  ]
})

export class TableUsersComponent {
  @Input() users: User[] = [];
  @Input() itemsPerPage: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Input() totalPages: number = 0;
  searchQuery: string = "";



  constructor(private apiUserService: ApiUserService,private dialog: MatDialog, private translate: TranslateService,private router: Router) {}



  @Input() currentPage: number = 1;
  @Input() profiles!: any[];
  @Input() itemsPerPageOptions!: number[];
  @Output() profileSelected = new EventEmitter<number>();
  @Output() profileDeleted = new EventEmitter<number>();

  get displayedPages(): number[] {
    const maxDisplayedPages = 3;
    let startPage: number, endPage: number;

    if (this.totalPages <= maxDisplayedPages) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      if (this.currentPage <= 2) {
        startPage = 1;
        endPage = maxDisplayedPages;
      } else if (this.currentPage + 1 >= this.totalPages) {
        startPage = this.totalPages - (maxDisplayedPages - 1);
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - 1;
        endPage = this.currentPage + 1;
      }
    }

    return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
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

  openDeletetDialog(userId: number): void {



  }

  loadUsers(page: number): void {
    console.log("table-users");
    this.apiUserService.getUsers(this.itemsPerPage, page - 1, this.searchQuery).subscribe(
      (data: any) => {
        this.users = data.users;
        this.totalPages = data.totalPages;
        console.log(this.users);
      },
      (error: any) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }





  getUserById(userId: number) {
      const queryParams = {
        userId: userId,
      };
      console.log("envios", queryParams)
      this.router.navigate([], { queryParams });

  }
}
