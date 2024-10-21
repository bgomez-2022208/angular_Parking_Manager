import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from '../../../../user/services/user.service';
import { User } from '../../../model/user.model';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import Swal from 'sweetalert2';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
  animations: [
    trigger('scaleFadeAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),

      transition('void => *', [animate('400ms ease-out')])
    ])
  ]
})
export class AddUsersComponent implements OnInit {
  @Output() userCreated = new EventEmitter<User>();
  userForm: FormGroup;
  users: User[] = [];
  profiles: any[] = [];
  isEditing = false;
  userId?: number;
  userIdSelected = false;
  mostrarBotonGuardar = true;
  mostrarBoton = false;
  showTitle = true;
  showTitleUpdate = false;

  constructor(
    private notifications: NotificationsService,
    private fb: FormBuilder,
    private apiUserService: ApiUserService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      profile: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      dpi: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      status: [false, Validators.required]
    });
  }

  resetUserFormState(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.setErrors(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }

  ngOnInit(): void {
    this.loadProfiles();
    this.route.queryParams.subscribe(params => {
      if (params['userId']) {
        this.isEditing = true;
        this.userId = +params['userId'];
        this.loadUserData(this.userId);
        this.userIdSelected = true;
      }
    });
  }

  loadUsers() {
    this.userIdSelected = false;

    const timestamp = Math.floor(Date.now() / 1000);
    this.router.navigate(['/admin/users'], {
      queryParams: { timestamp: timestamp }
    });
  }
  getErrorMessage(controlName: string) {
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
    this.apiUserService.getProfilesUser().subscribe(
      (data: any) => {
        this.profiles = data.message;

        console.log(this.profiles);
      },
      (error: any) => {
        console.error('Error loading profiles', error);
      }
    );
  }

  loadUserData(userId: number) {
    this.mostrarBoton = true;
    this.mostrarBotonGuardar = false;
    this.userForm.get('email')?.disable();
    this.showTitle = false;
    this.showTitleUpdate = true;

    this.apiUserService.getUserById(userId).subscribe({
      next: userData => {
        this.userForm.patchValue({
          ...userData.message,
          password: '',
          profile: userData.message.idProfile.profileId
        });
      },
      error: err => {
        console.error('Error loading user data:', err);
      }
    });
  }

  onSubmit() {
    if (this.userForm) {
      const userData = {
        name: this.userForm.value.name,
        surname: this.userForm.value.surname,
        age: this.userForm.value.age,
        dpi: this.userForm.value.dpi,
        email: this.userForm.value.email,
        status: true,
        profileId: this.userForm.value.profile
      };

      this.apiUserService.createUser(userData).subscribe(
        newUser => {
          this.loadUsers();
          this.userForm.reset();
          this.resetUserFormState();
          this.isEditing = false;

          Swal.fire({
            icon: 'success',
            title: this.translate.instant('ALERT_SUCCESS.TITLE'),
            text: this.translate.instant('ALERT_SUCCESS.MESSAGE'),
            timer: 3000,
            showConfirmButton: false
          });
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }

  updateUser() {
    if (this.userForm.valid && this.isEditing && this.userId) {
      const userData = {
        name: this.userForm.value.name,
        surname: this.userForm.value.surname,
        age: this.userForm.value.age,
        dpi: this.userForm.value.dpi,
        status: true,
        profileId: this.userForm.value.profile
      };
      this.userForm.get('email')?.enable();
      this.mostrarBoton = false;
      this.mostrarBotonGuardar = true;
      this.apiUserService.updateUser(this.userId, userData).subscribe(
        updatedUser => {
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('ALERT_SUCCESS.TITLE'),
            text: this.translate.instant('ALERT_SUCCESS.MESSAGE'),
            timer: 3000,
            showConfirmButton: false
          });
          this.loadUsers();
          this.userForm.reset();
          this.userId = undefined;
          this.isEditing = false;
          this.showTitle = true;
          this.showTitleUpdate = false;
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }

  handleError(error: any) {
    if (error.status === 409) {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('ALERT_WARNING.EMAIL_IN_USE_TITLE'),
        text: this.translate.instant('ALERT_WARNING.EMAIL_IN_USE_MESSAGE'),
        timer: 3000,
        showConfirmButton: false
      });
    } else {
      console.error('Error occurred', error);
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('ALERT_ERROR.TITLE'),
        text: this.translate.instant('ALERT_ERROR.MESSAGE'),
        timer: 3000,
        showConfirmButton: false
      });
    }
  }

  CancelUpdate() {
    this.userIdSelected = false;
    this.mostrarBoton = false;
    this.mostrarBotonGuardar = true;
    this.showTitle = true;
    this.showTitleUpdate = false;
    this.userForm.get('email')?.enable();
    this.userForm.reset();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }

  onToggleChange(event: MatSlideToggleChange) {
    this.userIdSelected = false;
    const status = event.checked;
    if (!status) {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('USER.ALERT_DISABLE_USER_TITLE'),
        text: this.translate.instant('USER.ALERT_DISABLE_USER_MESSAGE'),
        confirmButtonText: this.translate.instant(
          'USER.ALERT_DISABLE_USER_BUTTON_YES'
        ),
        cancelButtonText: this.translate.instant(
          'USER.ALERT_DISABLE_USER_BUTTON_NO'
        ),
        showCancelButton: true
      }).then(result => {
        if (result.isConfirmed) {
          this.userIdSelected = false;
          this.apiUserService
            .userDeleteStatus(
              status,
              this.userId,
              this.userForm.value.dpi,
              this.userForm.value.profile
            )
            .subscribe({
              next: response => {
                Swal.fire({
                  icon: 'success',
                  title: this.translate.instant(
                    'USER.ALERT_DISABLE_USER_SUCCESS_MESSAGE'
                  )
                });
                this.userForm.reset();
                this.resetUserFormState();
                this.loadUsers();
              },
              error: error => {
                console.error('Error al desactivar usuario:', error);
              }
            });
          this.loadUsers();
        }
        this.userForm.reset();
        this.resetUserFormState();
      });
    } else {
      this.userIdSelected = false;
      this.apiUserService
        .userDeleteStatus(
          status,
          this.userId,
          this.userForm.value.dpi,
          this.userForm.value.profile
        )
        .subscribe({
          next: response => {
            Swal.fire({
              icon: 'success',
              title: this.translate.instant(
                'USER.ALERT_ACTIVATE_USER_SUCCESS_MESSAGE'
              )
            });
            this.userForm.reset();
            this.loadUsers();
          },
          error: error => {
            console.error('Error al activar usuario:', error);
          }
        });
    }
  }
}
