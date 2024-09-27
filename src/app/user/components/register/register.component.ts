import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('modalAnimation', [
      state('void', style({ transform: 'scale(0.8)', opacity: 0 })),
      state('*', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class RegisterComponent {
  form: FormGroup;
  passwordFieldType = 'password';
  valueIcon1 = 'visibility_off';

  constructor( private translate: TranslateService, private fb: FormBuilder, private userService: ApiUserService) {
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
      controlName === 'age'? this.translate.instant('ERRORS.ERROR_INVALID_AGE') : '' ||
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
          console.log(response);
        },
        error: (error) => {
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
