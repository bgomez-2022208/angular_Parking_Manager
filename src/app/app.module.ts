import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./admin/components/navbar/navbar.component";
import { FilterComponent } from "./admin/components/filter/filter.component";
import { FormParkingComponent } from './admin/components/form-parking/form-parking.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, FormParkingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavbarComponent,
    FilterComponent,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
