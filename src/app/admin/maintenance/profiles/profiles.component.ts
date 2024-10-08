import { Component, inject, Input} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import {User} from "../../model/user.model";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent {
  title: string = 'Profile';

  constructor (private translate: TranslateService){
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  usersControl = new FormControl(false);
  profileControl = new FormControl(false);
  parkingControl = new FormControl(false);
  users: User[] = [];


  onPageChange(newPage: number) {
    console.log(`Página actual: ${newPage}`);
  }
}
