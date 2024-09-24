import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutConfirmComponent } from './components/logout-confirm/logout-confirm.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormParkingComponent } from './components/form-parking/form-parking.component';
import { TableUsersComponent } from "./components/table-users/table-users.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  declarations: [
    NavbarComponent,
    LogoutConfirmComponent,
    FilterComponent,
    FormParkingComponent,
    TableUsersComponent
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
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    NavbarComponent,
    FilterComponent,
    FormParkingComponent,
    TableUsersComponent
  ]
})
export class AdminModule { }
