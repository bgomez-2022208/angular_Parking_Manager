import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
import { MatPaginator, PageEvent } from '@angular/material/paginator';


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
  @ViewChild(MatPaginator) paginator!: MatPaginator;




  constructor(private apiUserService: ApiUserService,private dialog: MatDialog, private translate: TranslateService,private router: Router) {}



  @Input() currentPage: number = 1;
  @Input() profiles!: any[];
  @Input() itemsPerPageOptions!: number[];
  @Output() profileSelected = new EventEmitter<number>();
  @Output() profileDeleted = new EventEmitter<number>();
  @Input() totalElements: number = 0;



  changePage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    console.log(event.pageIndex);
    this.loadUsers(event.pageIndex);
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


  loadUsers(page: number): void {
    this.apiUserService.getUsers(this.itemsPerPage, page, this.searchQuery).subscribe(
      (data: any) => {
        this.users = data.users;
        this.totalElements = data.totalElements;

        this.totalPages = data.totalPages;
        this.paginator.length = this.totalElements;
        this.paginator.pageIndex = page;
        this.currentPage = page;
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

