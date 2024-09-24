import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { ProfilesComponent } from './profiles/profiles.component';



@NgModule({
  declarations: [
    SearchComponent,
    ProfilesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
