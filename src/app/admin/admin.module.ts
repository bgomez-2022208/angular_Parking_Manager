import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorIntl,
  MatPaginatorModule
} from '@angular/material/paginator';

// Components
import { TableUsersComponent } from '../shared/table-users/table-users.component';
import { NavbaruserComponent } from './maintenance/components/navbaruser/navbaruser.component';
import { FilterUserComponent } from './maintenance/components/filter-user/filter-user.component';
import { AddUsersComponent } from './maintenance/components/add-users/add-users.component';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UsersComponent } from './maintenance/users/users.component';

import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilesComponent } from './maintenance/profiles/profiles.component';
import { AuditoriaComponent } from './maintenance/auditoria/auditoria.component';
import { CardAuditoryComponent } from './maintenance/components/card-auditory/card-auditory.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MatCardModule } from '@angular/material/card';
import { DeleteUserConfirmComponent } from './maintenance/components/delete-user-confirm/delete-user-confirm.component';
import { FareComponent } from './maintenance/fare/fare.component';
import { TableProfilesComponent } from '../shared/table-profiles/table-profiles.component';
import { RegisterParkingComponent } from './maintenance/register-parking/register-parking.component';
import { FilterSalidaComponent } from './maintenance/components/filter-salida/filter-salida.component';
import { FareTableComponent } from './maintenance/components/fare-table/fare-table.component';
import { ReporteComponent } from './maintenance/reporte/reporte.component';
import { CardReporterComponent } from './maintenance/components/card-reporter/card-reporter.component';
import { ParkingComponent } from './maintenance/parking/parking.component';
import { CustomPaginatorIntl } from '../user/services/custom-paginator';
import { ForbiddenComponent } from '../guard/forbidden/forbidden.component';
import { AuthGuard } from '../guard/auth.guard.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PROFILE'] }
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'auditory',
    component: AuditoriaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_AUDITH'] }
  },
  {
    path: 'fares',
    component: FareComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FARE'] }
  },
  {
    path: 'register',
    component: RegisterParkingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_REGISTER'] }
  },
  {
    path: 'reporte',
    component: ReporteComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_DETAILROLEPROFILE'] }
  },
  {
    path: 'parking',
    component: ParkingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PARKING'] }
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  }
];

@NgModule({
  declarations: [
    ReporteComponent,
    AuditoriaComponent,
    TableUsersComponent,
    TableProfilesComponent,
    ParkingComponent,
    NavbaruserComponent,
    FilterUserComponent,
    ForbiddenComponent,
    AddUsersComponent,
    ProfilesComponent,
    UsersComponent,
    FareComponent,
    CardAuditoryComponent,
    DeleteUserConfirmComponent,
    FilterSalidaComponent,
    RegisterParkingComponent,
    FareTableComponent,
    CardReporterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatOptionModule,
    TranslateModule,
    SimpleNotificationsModule.forRoot(),
    MatCardModule
  ],
  exports: [
    TableUsersComponent,
    AddUsersComponent,
    FilterUserComponent,
    NavbaruserComponent,
    CardAuditoryComponent,
    CardReporterComponent
  ],
  providers: [
    DatePipe,
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class AdminModule {}
