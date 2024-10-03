import { Component, Input } from '@angular/core';
import { LogoutConfirmComponent } from "../logout-confirm/logout-confirm.component";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from '@ngx-translate/core'; // Asegúrate de importar el servicio de traducción

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.scss']
})
export class NavbaruserComponent {
  @Input() title: string = '';

  currentLanguage: string = 'es';

  constructor(private dialog: MatDialog, private translate: TranslateService) {}

  openLogoutDialog() {
    this.dialog.open(LogoutConfirmComponent, {
      width: '300px',
    });
  }

  switchLanguage() {
    // Cambia entre 'es' y 'en'
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.translate.use(this.currentLanguage);
  }
}
