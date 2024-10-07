import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

// Components
import { SearchComponent } from './maintenance/search/search.component';
import { NavbarComponent } from './maintenance/components/navbar/navbar.component';
import { LogoutConfirmComponent } from './maintenance/components/logout-confirm/logout-confirm.component';
import { FilterComponent } from './maintenance/components/filter/filter.component';
import { FormParkingComponent } from './maintenance/components/form-parking/form-parking.component';
import { TableUsersComponent } from '../shared/table-users/table-users.component';
import { NavbaruserComponent } from './maintenance/components/navbaruser/navbaruser.component';
import { FilterUserComponent } from './maintenance/components/filter-user/filter-user.component';
import { AddUsersComponent } from './maintenance/components/add-users/add-users.component';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UsersComponent } from './maintenance/users/users.component';


import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { AuditoriaComponent } from './maintenance/auditoria/auditoria.component';
import { TranslateModule } from "@ngx-translate/core";
import { CardAuditoryComponent } from './maintenance/components/card-auditory/card-auditory.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';

import {ProfilesComponent} from "./profiles/profiles.component";

const routes : Routes = [
  {
    path:'profiles',
    component: ProfilesComponent
  },
  {
    path:'users',
    component: UsersComponent
  },
  {
    path:'auditory',
    component: AuditoriaComponent
  }

]

@NgModule({
  declarations: [
    AuditoriaComponent,
    SearchComponent,
    NavbarComponent,
    LogoutConfirmComponent,
    FilterComponent,
    FormParkingComponent,
    TableUsersComponent,
    NavbaruserComponent,
    FilterUserComponent,
    AddUsersComponent,
    ProfilesComponent,
    UsersComponent,
    CardAuditoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatOptionModule,
    TranslateModule,CdkTableModule,MatCardModule
  ],
  exports: [
    NavbarComponent,
    FilterComponent,
    FormParkingComponent,
    TableUsersComponent,
    AddUsersComponent,
    FilterUserComponent,
    NavbaruserComponent,DatePipe
  ],
  providers: [
    DatePipe
  ],
})
export class AdminModule {}
