import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbaruserComponent } from './admin/components/navbaruser/navbaruser.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FilterUserComponent } from './admin/components/filter-user/filter-user.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddUsersComponent } from './admin/components/add-users/add-users.component';
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    NavbaruserComponent,
    FilterUserComponent,
    AddUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AdminModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
