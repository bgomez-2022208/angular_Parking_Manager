import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Asegúrate de importar MatDialog y MatDialogModule
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { LogoutConfirmComponent } from '../logout-confirm/logout-confirm.component'; // Importa el componente del modal

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule] // Agrega MatDialogModule
})
export class NavbarComponent {

  constructor(private dialog: MatDialog) {}

  openLogoutDialog() {
    this.dialog.open(LogoutConfirmComponent, {
      width: '300px',
    });
  }
}
