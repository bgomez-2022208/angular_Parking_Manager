import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';


@NgModule({
  declarations: [UsersComponent],
  imports: [ 
    CommonModule,
    UsersComponent,
    RouterModule.forChild([{ path: '', component: UsersComponent }])
  ]
})
export class UsersModule { }
