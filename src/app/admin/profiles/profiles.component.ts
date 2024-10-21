import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {
  title: string = 'Profile';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  matcher = new MyErrorStateMatcher();

  usersControl = new FormControl(false);
  profileControl = new FormControl(false);
  parkingControl = new FormControl(false);

  users = [
    { email: 'user1@example.com', name: 'User One' },
    { email: 'user2@example.com', name: 'User Two' }
  ];

  onPageChange(newPage: number) {
    console.log(`Página actual: ${newPage}`);
  }
}
