import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/user/services/languaje.service';
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
  isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly languageService: LanguageService,
    private readonly  userService: ApiUserService
  ) {}

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
        this.userService.logout();
        Swal.fire({
          title: this.translate.instant('LOGOUT.SUCCESS'),
          icon: 'success'
        });
        this.router.navigate(['/auth/login']);
      }
    });
  }

  onLanguageChange(lang: string) {
    this.isLoading = true;
    this.languageService.changeLanguage(lang).subscribe({
      next: () => {
        setTimeout(() => {
          this.currentLanguage = lang;
          this.isLoading = false;
        }, 2000);
      },
      error: () => {
        console.error('Error al cambiar de idioma')
        this.isLoading = false
      }
    });
  }
}
