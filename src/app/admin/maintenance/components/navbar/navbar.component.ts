import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Importa solo MatDialog, no MatDialogModule
import { LogoutConfirmComponent } from '../logout-confirm/logout-confirm.component'; // Importa el componente del modal

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private dialog: MatDialog) {}

  openLogoutDialog() {
    this.dialog.open(LogoutConfirmComponent, {
      width: '300px'
    });
  }
}
