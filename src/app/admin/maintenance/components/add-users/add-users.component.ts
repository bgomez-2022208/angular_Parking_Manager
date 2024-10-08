import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiUserService } from "../../../../user/services/user.service";
import { User } from "../../../model/user.model";
import { NotificationsService } from "angular2-notifications";
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  @Output() userCreated = new EventEmitter<User>();
  userForm: FormGroup;
  users: User[] = [];
  profiles: any[] = [];
  isEditing = false;
  userId?: number;

  constructor(
    private notifications: NotificationsService,
    private fb: FormBuilder,
    private apiUserService: ApiUserService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,

  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      profile: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      dpi: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProfiles();

    this.route.queryParams.subscribe(params => {
      if (params['userId']) {
        this.isEditing = true;
        this.userId = +params['userId'];
        this.loadUserData(this.userId);
      }
    });
  }

  loadUsers() {
    this.apiUserService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error("Error loading users", error);
      }
    );
  }
  getErrorMessage(controlName: string){
    const control = this.userForm.get(controlName);

    if (control?.hasError('required')) {
      switch (controlName) {
        case 'name':
          return this.translate.instant('ERRORS.ERROR_NAME_REQUIRED');
        case 'surname':
          return this.translate.instant('ERRORS.ERROR_SURNAME_REQUIRED');
        case 'age':
          return this.translate.instant('ERRORS.ERROR_AGE_REQUIRED');
        case 'email':
          return this.translate.instant('ERRORS.ERROR_EMAIL_REQUIRED');
        case 'dpi':
          return this.translate.instant('ERRORS.ERROR_DPI_REQUIRED');
        case 'password':
          return this.translate.instant('ERRORS.ERROR_PASSWORD_REQUIRED');
        default:
          return '';
      }
    }

    if (controlName === 'email' && control?.hasError('email')) {
      return this.translate.instant('ERRORS.ERROR_INVALID_EMAIL');
    }

    return '';
  }



  loadProfiles() {
    this.apiUserService.getProfiles().subscribe(
      (data: any) => {
        this.profiles = data.profiles;
      },
      (error: any) => {
        console.error("Error loading profiles", error);
      }
    );
  }

  loadUserData(userId: number) {
    this.apiUserService.getUserById(userId).subscribe({
      next: (userData) => {
        this.userForm.patchValue({
          ...userData.message,
          password: '',
          profile: userData.message.idProfile.profileId
        });
      },
      error: (err) => {
        console.error('Error loading user data:', err);
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = {
        name: this.userForm.value.name,
        surname: this.userForm.value.surname,
        age: this.userForm.value.age,
        dpi: this.userForm.value.dpi,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        status: true,
        profileId: this.userForm.value.profile
      };

      if (this.isEditing && this.userId) {
        this.apiUserService.updateUser(this.userId, userData).subscribe(
          (updatedUser) => {
            this.notifications.success('Éxito', 'Usuario actualizado correctamente', {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
              animate: 'fade'
            });
            this.loadUsers();
            this.userForm.reset();
            this.isEditing = false;
            this.userId = undefined;
          },
          (error) => {
            console.error("Error updating user", error);
            this.notifications.error('Error', 'No se pudo actualizar el usuario. Intenta nuevamente.', {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
              animate: 'fade'
            });
          }
        );
      } else {
        this.apiUserService.createUser(userData).subscribe(
          (newUser) => {
            this.userCreated.emit(newUser);
            this.loadUsers();
            this.userForm.reset();
            this.notifications.success('Éxito', 'Usuario guardado correctamente', {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
              animate: 'fade'
            });
          },
          (error) => {
            console.error("Error creating user", error);
            this.notifications.error('Error', 'No se pudo guardar el usuario. Intenta nuevamente.', {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
              animate: 'fade'
            });
          }
        );
      }
    }
  }

  CancelUpdate() {
    this.userForm.reset();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }
}
