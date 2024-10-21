import {Component, Inject, OnInit} from '@angular/core';
import { User } from "../../../model/user.model";
import { ApiUserService } from "../../../services/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-delete-user-confirm',
  templateUrl: './delete-user-confirm.component.html',
  styleUrls: ['./delete-user-confirm.component.scss'],
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
export class DeleteUserConfirmComponent {
  users: User[] = [];
  itemsPerPage: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  totalUsers: number = 0;
  searchQuery: string = "";



  constructor(

    private apiUserService: ApiUserService,
    public dialogRef: MatDialogRef<DeleteUserConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private translate: TranslateService
  ) {}

  deleteUser(): void {
    const userId = this.data.userId;
    this.apiUserService.deleteUser(userId).subscribe(
      (response: any) => {
        console.log('Usuario eliminado con éxito', response);

        Swal.fire({
          icon: 'success',
          title: this.translate.instant('ALERT_DELETE.TITLE'),
          text: this.translate.instant('ALERT_DELETE.MESSAGE'),
          timer: 3000,
          showConfirmButton: false
        });

        this.dialogRef.close(true);
      },
      (error: any) => {
        console.error('Error al eliminar el usuario', error);

        Swal.fire({
          icon: 'error',
          title: this.translate.instant('ALERT_DELETE.TITLE_ERROR'),
          text: this.translate.instant('ALERT_DELETE.MESSAGE_ERROR'),
          timer: 3000,
          showConfirmButton: false
        });

        this.dialogRef.close(false);
      }
    );
  }




  onNoClick(): void {
    this.dialogRef.close();
  }
}
