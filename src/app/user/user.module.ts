import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordTwoComponent } from './components/forgot-password-two/forgot-password-two.component';
import { ForgotPasswordEmailComponent } from './components/forgot-password-email/forgot-password-email.component';
import { RegisterComponent } from './components/register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordTwoComponent,
    ForgotPasswordEmailComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent
  ]
  
})
export class UserModule { }
