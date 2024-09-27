import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApiUserService } from '../../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.css']
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
          this.router.navigate(['/forgot-password-two', this.email]);
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
