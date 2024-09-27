import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/components/login/login.component';
import { ForgotPasswordEmailComponent } from './user/components/forgot-password-email/forgot-password-email.component';
import { ForgotPasswordTwoComponent } from './user/components/forgot-password-two/forgot-password-two.component';
import { RegisterComponent } from './user/components/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password-email', component: ForgotPasswordEmailComponent},
  {path: 'forgot-password-two/:email', component: ForgotPasswordTwoComponent},
  {path: '', redirectTo: '/login',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
