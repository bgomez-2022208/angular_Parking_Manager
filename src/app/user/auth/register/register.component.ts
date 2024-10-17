import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
      ]),

      transition('* => void', [
        animate('400ms ease-in', keyframes([ // Animación para la salida
          style({ opacity: 1, transform: 'translateY(0) scale(1)', offset: 0 }), // Inicio
          style({ opacity: 0.5, transform: 'translateY(10px) scale(0.9)', offset: 0.5 }), // Mitad
          style({ opacity: 0, transform: 'translateY(30px) scale(0.9)', offset: 1 }) // Final
        ]))
      ])
    ])
  ]
})
export class RegisterComponent {
  form: FormGroup;
  passwordFieldType = 'password';
  valueIcon1 = 'visibility_off';

  constructor( private router: Router,private translate: TranslateService, private fb: FormBuilder, private userService: ApiUserService) {
    this.translate.setDefaultLang('es');
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      surname: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.pattern('^\\d+$')]],
      dpi: ['', [Validators.required, Validators.pattern('^\\d{13}$')]]
    });
  }

  getErrorMessage(controlName: string){
    const control = this.form.get(controlName);
    if (control?.hasError('required')){
      return controlName === 'name'? this.translate.instant('ERRORS.ERROR_NAME_REQUIRED') : '' ||
      controlName ==='surname'? this.translate.instant('ERRORS.ERROR_SURNAME_REQUIRED') : '' ||
      controlName === 'email'? this.translate.instant('ERRORS.ERROR_EMAIL_REQUIRED') : '' ||
      controlName === 'age'? this.translate.instant('ERRORS.ERROR_AGE_REQUIRED') : '' ||
      controlName === 'dpi'? this.translate.instant('ERRORS.ERROR_DPI_REQUIRED') : '';
    } else if (control?.hasError('pattern')){
      return controlName === 'age'? this.translate.instant('ERRORS.ERROR_INVALID_AGE') : '' ||
      controlName === 'dpi'? this.translate.instant('ERRORS.ERROR_INVALID_DPI') : '' ||
      controlName === 'name'? this.translate.instant('ERRORS.ERROR_INVALID_NAME') : '' ||
      controlName ==='surname'? this.translate.instant('ERRORS.ERROR_INVALID_SURNAME') : '';
    } else if (control?.hasError('email')){
      return controlName === 'email'? this.translate.instant('ERRORS.ERROR_INVALID_EMAIL') : '' 
    }
    return ''
  }


  togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text'
      this.valueIcon1 = 'visibility'
    } else {
      this.passwordFieldType = 'password'
      this.valueIcon1 = 'visibility_off'
    }
  }


  register() {
    if (this.form.valid) { 
      const userData = this.form.value;
      this.userService.register(userData).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('ALERT_REGISTER.TITLE'),
            text: this.translate.instant('ALERT_REGISTER.MESSAGE')
          })
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('ALERT_REGISTER.TITLE_BAD'),
            text: this.translate.instant('ERRORS.ERROR_REGISTER')
          })
          console.error(error);
        }
      });
    } else {
      console.error('Formulario no válido');
    }
  }

  onSubmit() {
      this.register();
  }
}
