import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApiUserService } from '../../services/user.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LanguageService } from '../../services/languaje.service';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('scaleFadeAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })), // Estado inicial (fuera del DOM, ligeramente reducido)
      state('*', style({ opacity: 1, transform: 'scale(1)' })), // Estado final (en el DOM, tamaño normal)
      
      transition('void => *', [
        animate('400ms ease-out') // Animación de entrada
      ])
    ])
  ]
})
export class LoginComponent {
  form: FormGroup;
  passwordFieldType = 'password';
  valueIcon = 'visibility_off';

  languages: string[] = []
  currentLanguage: string = ''

  valueIconChecked = 'check_box_outline_blank';

  constructor(private router: Router, private fb: FormBuilder, private translate: TranslateService, private userService: ApiUserService, private languageService: LanguageService) {
    this.translate.setDefaultLang('es');
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.languages = this.languageService.getAvailableLanguages()
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }
  onLanguageChange(event: MatSelectChange) {
    const selectedLanguage = event.value;
    this.languageService.changeLanguage(selectedLanguage);
  }

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName)
    if (control?.hasError('required')){
      return controlName === 'email' ? this.translate.instant('ERRORS.ERROR_EMAIL_REQUIRED') : '' ||
      controlName === 'password' ? this.translate.instant('ERRORS.ERROR_PASSWORD_REQUIRED') : ''
    } else if (control?.hasError('email')){
      return controlName === 'email' ? this.translate.instant('ERRORS.ERROR_INVALID_EMAIL') : ''
    }
  }

  togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.valueIcon = 'visibility';
    } else {
      this.passwordFieldType = 'password';
      this.valueIcon = 'visibility_off';
    }
  }

  toggleCheckBox() {
    if (this.valueIconChecked === 'check_box_outline_blank') {
      this.valueIconChecked = 'check_box';
    } else {
      this.valueIconChecked = 'check_box_outline_blank';
    }
  }

  login(){
    if (this.form.valid) {
      const userData = this.form.value;
      this.userService.login(userData).subscribe({
        next: (response)=>{
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('ALERT_LOGIN.TITLE'),
            text: this.translate.instant('ALERT_LOGIN.MESSAGE')
          })
          this.router.navigate(['/admin/profiles']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('ALERT_LOGIN.TITLE_BAD'),
            text: this.translate.instant('ERRORS.ERROR_LOGIN')
          })
        }
      })
    }
  }

  onSubmit() {
    this.login()
  }
}
