import {Component, inject} from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfilesComponent } from './profiles.component';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    RouterModule.forChild([{ path: '', component: ProfilesComponent }]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: []
})
export class ProfilesModule { }
