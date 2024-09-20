import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutConfirmComponent } from './components/logout-confirm/logout-confirm.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormParkingComponent } from './components/form-parking/form-parking.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LogoutConfirmComponent,
    FilterComponent,
    FormParkingComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FilterComponent,
    FormParkingComponent
  ]
})
export class AdminModule { }
