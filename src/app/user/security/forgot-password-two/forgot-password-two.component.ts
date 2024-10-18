import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ApiUserService } from '../../services/user.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-forgot-password-two',
  templateUrl: './forgot-password-two.component.html',
  styleUrls: ['./forgot-password-two.component.scss'],
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
export class ForgotPasswordTwoComponent {
  form: FormGroup;

  passwordFieldType1 = 'password';
  valueIcon1 = 'visibility_off';

  passwordFieldType2 = 'password';
  valueIcon2 = 'visibility_off';


  constructor(private router: Router, private fb: FormBuilder, private translate: TranslateService, private route: ActivatedRoute, private userService: ApiUserService) {
    this.translate.setDefaultLang('es')
    this.form = this.fb.group({
      email: this.route.snapshot.paramMap.get('email'),
      verificationCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName)

    if (control?.hasError('required')) {
      return controlName === 'newPassword' ? this.translate.instant('ERRORS.ERROR_NEW_PASSWORD_REQUIRED') :
        controlName === 'confirmPassword' ? this.translate.instant('ERRORS.ERROR_CONFIRM_PASSWORD_REQUIRED') :
          controlName === 'verificationCode' ? this.translate.instant('ERRORS.ERROR_CODE_REQUIRED') : ''
    } else if (control?.hasError('pattern')) {
      return controlName === 'verificationCode' ? this.translate.instant('ERRORS.ERROR_CODE_INVALID') :
        controlName === 'newPassword' ? this.translate.instant('ERRORS.ERROR_INVALID_PASSWORD') : ''

    } else if (control?.hasError('mismatch')) {
      return this.translate.instant('ERRORS.ERROR_PASSWORD_NOT_SAME')
    }

    return ''
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value
    const confirmPassword = form.get('confirmPassword')?.value
  
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true })
    } else {
      form.get('confirmPassword')?.setErrors(null)
    }
  }

  validateNumberInput(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value
    inputElement.value = inputValue.replace(/\D/g, '')
  }

  togglePasswordVisibility1() {
    if (this.passwordFieldType1 === 'password') {
      this.passwordFieldType1 = 'text';
      this.valueIcon1 = 'visibility';
    } else {
      this.passwordFieldType1 = 'password';
      this.valueIcon1 = 'visibility_off';
    }
  }

  togglePasswordVisibility2() {
    if (this.passwordFieldType2 === 'password') {
      this.passwordFieldType2 = 'text';
      this.valueIcon2 = 'visibility';
    } else {
      this.passwordFieldType2 = 'password';
      this.valueIcon2 = 'visibility_off';
    }
  }

  resetPassword() {
    if (this.form.valid) {
      const userData = this.form.value;
      console.log(userData)
      this.userService.resetPassword(userData).subscribe({
        next: (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('ALERT_CHANGE_PASSWORD.TITLE'),
            text: this.translate.instant('ALERT_CHANGE_PASSWORD.MESSAGE')
          });
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('ALERT_CHANGE_PASSWORD.TITLE_BAD'),
            text: this.translate.instant('ERRORS.ERROR_UPDATE_PASSWORD')
          });
        }
      })
    }
  }

  onSubmit() {
    this.resetPassword();
  }
}
