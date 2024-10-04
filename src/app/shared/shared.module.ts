import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableUsersComponent } from './table-users/table-users.component';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [TableUsersComponent],
    imports: [CommonModule, MatIconModule],
  exports: [TableUsersComponent]
})
export class SharedModule {}
