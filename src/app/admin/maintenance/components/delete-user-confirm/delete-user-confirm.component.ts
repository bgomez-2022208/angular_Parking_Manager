import {Component, Inject, OnInit} from '@angular/core';
import { User } from "../../../model/user.model";
import { ApiUserService } from "../../../services/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-delete-user-confirm',
  templateUrl: './delete-user-confirm.component.html',
  styleUrls: ['./delete-user-confirm.component.scss']
})
export class DeleteUserConfirmComponent {
  users: User[] = [];
  itemsPerPage: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  totalUsers: number = 0;
  searchQuery: string = "";



  constructor(
    private notifications: NotificationsService,

    private apiUserService: ApiUserService,
    private dialogRef: MatDialogRef<DeleteUserConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private translate: TranslateService
  ) {}

  deleteUser(): void {
    const userId = this.data.userId;
    this.apiUserService.deleteUser(userId).subscribe(
      (response: any) => {
        console.log('Usuario eliminado con éxito', response);
        this.notifications.success(
          'Éxito',
          'Usuario eliminado correctamente',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            animate: 'fade'
          }
        );

        this.dialogRef.close(true);
      },
      (error: any) => {
        console.error('Error al eliminar el usuario', error);
        this.dialogRef.close(false);
      }
    );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
