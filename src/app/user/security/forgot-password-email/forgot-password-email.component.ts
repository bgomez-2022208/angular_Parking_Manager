import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApiUserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.scss'],
  animations: [
    trigger('componentAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(30px) scale(0.9)' })), // Estado inicial (fuera del DOM)
      state('*', style({ opacity: 1, transform: 'translateY(0) scale(1)' })), // Estado final (en el DOM)
      
      transition('void => *', [
        animate('600ms ease-out', keyframes([ // Animación para la entrada
          style({ opacity: 0, transform: 'translateY(30px) scale(0.9)', offset: 0 }), // Inicio
          style({ opacity: 0.7, transform: 'translateY(15px) scale(1)', offset: 0.7 }), // Mitad
          style({ opacity: 1, transform: 'translateY(0) scale(1)', offset: 1 }) // Final
        ]))
      ])
    ])
  ]
})
export class ForgotPasswordEmailComponent {
  email: string = '';
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: ApiUserService,
    private translate: TranslateService) {
      this.translate.setDefaultLang('es');
      this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return controlName === 'email' ? this.translate.instant('ERRORS.ERROR_EMAIL_REQUIRED') : ''
    } else if (control?.hasError('email')) {
      return controlName === 'email' ? this.translate.instant('ERRORS.ERROR_INVALID_EMAIL') : ''
    }
    return ''
  }

  onForgotPassword() {
    if (this.email) {
      this.authService.forgotPassword(this.email).subscribe({
        next: (response) => {
          console.log(response)
          Swal.fire({
            icon:'success',
            title: this.translate.instant('ALERT_SEND_CODE.TITLE'),
            text: this.translate.instant('ALERT_SEND_CODE.MESSAGE')
          })
          this.router.navigate(['/security/forgot-password-two', this.email]);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('ALERT_SEND_CODE.TITLE_BAD'),
            text: this.translate.instant('ERRORS.ERROR_SEND_CODE')
          })
        }
      })
    }
  }

  onSubmit() {
    if (this.form.valid && this.email) {
      this.onForgotPassword()
    } else {
      console.error('Debes ingresar un correo electrónico')
    }
  }
}
