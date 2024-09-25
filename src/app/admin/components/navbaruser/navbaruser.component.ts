import { Component } from '@angular/core';
import { LogoutConfirmComponent } from "../logout-confirm/logout-confirm.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.scss']
})
export class NavbaruserComponent {

  constructor(private dialog: MatDialog) {}

  openLogoutDialog() {
    this.dialog.open(LogoutConfirmComponent, {
      width: '300px',
    });
  }
}
