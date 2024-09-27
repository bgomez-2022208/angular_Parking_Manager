import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApiUserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  passwordFieldType = 'password';
  valueIcon = 'visibility_off';

  valueIconChecked = 'check_box_outline_blank';

  constructor(private router: Router, private fb: FormBuilder, private translate: TranslateService, private userService: ApiUserService) {
    this.translate.setDefaultLang('es');
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
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

  navigateForgotPassword() {
    this.router.navigate(['/forgot-password-email']);
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
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

  onSubmit() {
    this.login()
  }
}
