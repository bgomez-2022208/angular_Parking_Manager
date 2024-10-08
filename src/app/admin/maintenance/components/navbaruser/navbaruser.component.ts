import { Component, Input, OnInit } from '@angular/core';
import { LogoutConfirmComponent } from "../logout-confirm/logout-confirm.component";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/user/services/languaje.service';
import { MatSelectChange } from '@angular/material/select';
import Swal from 'sweetalert2';
import { ApiUserService } from 'src/app/user/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.scss']
})
export class NavbaruserComponent {
  @Input() title: string = '';

  languages: string[] = [];
  currentLanguage: string = '';

  constructor(private router: Router, private dialog: MatDialog, private translate: TranslateService, private languageService: LanguageService, private userService: ApiUserService) { }

  openLogoutDialog() {
    Swal.fire({
      title: this.translate.instant('LOGOUT.TITLE'),
      text: this.translate.instant('LOGOUT.MESSAGE'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: this.translate.instant('LOGOUT.BTN_YES'),
      cancelButtonText: this.translate.instant('LOGOUT.BTN_NO'),
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout()
        Swal.fire({
          title: this.translate.instant('LOGOUT.SUCCESS'),
          icon: 'success'
        })
        this.router.navigate(['/auth/login'])
      }
    })
  }

  ngOnInit() {
    this.languages = this.languageService.getAvailableLanguages()
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }
  onLanguageChange(lang: string) {
    this.languageService.changeLanguage(lang)
    this.currentLanguage = lang
  }
}
