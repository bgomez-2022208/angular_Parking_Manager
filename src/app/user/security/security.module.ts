import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ForgotPasswordEmailComponent } from "./forgot-password-email/forgot-password-email.component";
import { ForgotPasswordTwoComponent } from "./forgot-password-two/forgot-password-two.component";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
  { path: 'forgot-password-email', component: ForgotPasswordEmailComponent },
  { path: 'forgot-password-two/:email', component: ForgotPasswordTwoComponent }

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