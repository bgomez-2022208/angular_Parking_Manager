import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SequenceError } from 'rxjs';
import { ApiUserService } from 'src/app/user/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})


export class ProfilesComponent {
  form: FormGroup;
  profiles: any[] = [];
  profilesPaginated: any[] = []
  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  availableItemsPerPage: number[] = [5, 10, 20]

  roles: number[] = [1, 2, 3, 4, 5, 6, 7]
  selectRoles: number[] = []
  status: boolean = false;
  profileIdSelected: number | null = null;
  rolesChanged: boolean = false;
  originalRoles: number[] = [];
  valornameProfile: string = 'Profile'

  constructor(private translate: TranslateService, private userService: ApiUserService, private cd: ChangeDetectorRef,
              private fb: FormBuilder) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.form = this.fb.group({
      description: ['', Validators.required],
      status: ['true', Validators.required],
      usersControl: [false],
      profileControl: [false],
      parkingControl: [false],
      auditControl: [false],
      fareControl: [false],
      registerControl: [false],
      roleAndDetailsControl: [false]
    });
  }

  ngOnInit(): void {
    this.obtenerPerfiles(this.currentPage);
  }

  resetForm() {
    this.form.reset({
      description: '',
      status: 'true',
      profileControl: false,
      usersControl: false,
      auditControl: false,
      roleAndDetailsControl: false,
      parkingControl: false,
      fareControl: false,
      registerControl: false
    });
    this.selectRoles = [];
  }


  obtenerPerfiles(page: number) {
    this.userService.getProfiles().subscribe({
      next: (response: any) => {
        console.log(response)
        this.profiles = response.profiles
        this.totalPages = Math.ceil(this.profiles.length / this.itemsPerPage)
      },
      error: (error) => {
        console.error('Error al obtener perfiles:', error)
      }
    })
  }


  onPageChange(page: number) {
    this.currentPage = page
    this.obtenerPerfiles(page)
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage
    this.totalPages = Math.ceil(this.profiles.length / itemsPerPage)
    this.onPageChange(1)
  }

  getErrorMessage(controlName: string){
    const control = this.form.get(controlName);
    if (control?.hasError('required')){
      return controlName === 'description' ? this.translate.instant('ERRORS.ERROR_ADD_PROFILE'): ''
    }
  }

  getPerfil(profileId: number) {
    this.userService.getProfile(profileId).subscribe({
      next: (response) => {
        console.log(response);

        const roleIds = response.roles.map((role: any) => role.id);

        this.selectRoles = [];
        this.originalRoles = [...roleIds]

        this.form.setValue({
          description: response.profile.description || '',
          status: response.profile.status || 'true',
          profileControl: roleIds.includes(1),
          usersControl: roleIds.includes(2),
          auditControl: roleIds.includes(3),
          roleAndDetailsControl: roleIds.includes(4),
          parkingControl: roleIds.includes(5),
          fareControl: roleIds.includes(6),
          registerControl: roleIds.includes(7)
        });

        this.selectRoles = [...roleIds]
        this.checkRolesChanged()

        if (roleIds.includes(1)) this.selectRoles.push(1);
        if (roleIds.includes(2)) this.selectRoles.push(2);
        if (roleIds.includes(3)) this.selectRoles.push(3);
        if (roleIds.includes(4)) this.selectRoles.push(4);
        if (roleIds.includes(5)) this.selectRoles.push(5);
        if (roleIds.includes(6)) this.selectRoles.push(6);
        if (roleIds.includes(7)) this.selectRoles.push(7);
      },
      error: (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    });
  }

  deleteProfile(profileId: number) {
    Swal.fire({
      title: this.translate.instant('ALERT_PROFILE.TITLE_DELETE'),
      text: this.translate.instant('ALERT_PROFILE.MESSAGE_INFO'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('ALERT_PROFILE.BTN_YES'),
      cancelButtonText: this.translate.instant('ALERT_PROFILE.BTN_NO')
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteProfile(profileId).subscribe({
          next: () => {
            this.obtenerPerfiles(this.currentPage)
            Swal.fire({
              icon: 'success',
              title: this.translate.instant('ALERT_PROFILE.TITLE_DELETE_SUCCESS'),
              text: this.translate.instant('ALERT_PROFILE.MESSAGE_DELETE_SUCCESS'),
            })
            this.resetForm()
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: this.translate.instant('ALERT_PROFILE.TITLE_BAD'),
              text: error
            })
          }
        })
      }
    })
  }

  onProfileDeleted(profileId: number): void {
    this.deleteProfile(profileId)
  }



  onToggleRole(roleId: number, event: any) {
    if (event.checked) {
      this.selectRoles.push(roleId);
      console.log(this.selectRoles)
    } else {
      this.selectRoles = this.selectRoles.filter(id => id !== roleId);
    }

    this.checkRolesChanged()
  }

  checkRolesChanged() {
    this.rolesChanged = this.selectRoles.sort().toString() !== this.originalRoles.sort().toString();
  }
  newProfile() {
    if (this.form.valid) {
      const profile = {
        description: this.form.value.description,
        status: this.form.value.status === 'true'
      }
      const roles = this.selectRoles.join(',')
      this.userService.addProfile(profile, roles).subscribe({
        next: (response) => {
          this.obtenerPerfiles(this.currentPage)
          Swal.fire({
            title: this.translate.instant('ALERT_PROFILE.TITLE_ADD'),
            text: this.translate.instant('ALERT_PROFILE.MESSAGE_SUCCESS'),
            icon:'success',
          })
          this.resetForm()
        },
        error: (error) => {
          Swal.fire({
            title: this.translate.instant('ALERT_PROFILE.TITLE_BAD_ADD'),
            text: error,
            icon: 'error',
          })
        }
      })
    }
  }

  updateProfile() {
    const roles = this.selectRoles.join(',');

    if (this.profileIdSelected) {
      this.userService.updateProfile(this.profileIdSelected, roles).subscribe({
        next: (response) => {
          Swal.fire({
            title: this.translate.instant('ALERT_PROFILE.TITLE_UPDATE'),
            text: this.translate.instant('ALERT_PROFILE.MESSAGE_UPDATE_SUCCESS'),
            icon:'success',
          })
          this.obtenerPerfiles(this.currentPage)
          this.resetForm()
        },
        error: (error) => {
          Swal.fire({
            title: this.translate.instant('ALERT_PROFILE.TITLE_BAD_UPDATE'),
            text: error,
            icon: 'error',
          })
        }
      })
    }
  }
}
