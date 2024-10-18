import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ForgotPasswordEmailComponent } from "./forgot-password-email/forgot-password-email.component";
import { ForgotPasswordTwoComponent } from "./forgot-password-two/forgot-password-two.component";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NoAuthGuard } from "src/app/guard/no-auth-guard/no-auth-guard.component";

const routes: Routes = [
  { path: 'forgot-password-email', component: ForgotPasswordEmailComponent, canActivate: [NoAuthGuard] },
  { path: 'forgot-password-two/:email', component: ForgotPasswordTwoComponent, canActivate: [NoAuthGuard] }

]


@NgModule({
  declarations: [
    ForgotPasswordEmailComponent,
    ForgotPasswordTwoComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [RouterModule]
})

export default class SecurityModule { }