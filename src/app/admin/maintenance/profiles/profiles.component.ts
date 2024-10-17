import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ApiUserService } from 'src/app/user/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})


export class ProfilesComponent implements OnInit {
  form: FormGroup;
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  displayedColumns: string[] = ['status', 'description']
  profiles = new MatTableDataSource<any>()
  searchControl = new FormControl('')
  roles: number[] = [1, 2, 3, 4, 5, 6, 7]
  selectRoles: number[] = []
  profileIdSelected: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private translate: TranslateService, private userService: ApiUserService, private cd: ChangeDetectorRef,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['', [Validators.required, this.noWhiteSpaceValidator, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+([ A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/)]],
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

  noWhiteSpaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;

    if (typeof value === 'string') {
      const isWhitespace = (control.value || '').trim().length === 0
      const isValid = !isWhitespace
      return isValid ? null : { whitespace: true }
    }
    return null
  }

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return controlName === 'description' ? this.translate.instant('PROFILE.ERROR_REQUIRED') : ''
    }
    if (control?.hasError('whitespace')) {
      return controlName === 'description' ? this.translate.instant('PROFILE.ERROR_WHITESPACES') : ''
    }
    if (control?.hasError('pattern')) {
      return controlName === 'description' ? this.translate.instant('PROFILE.ERROR_PATTERN') : ''
    }

    return ''
  }

  resetForm() {
    this.profileIdSelected = 0;
    this.form.reset({
      description: '',
      status: false,
      profileControl: false,
      usersControl: false,
      auditControl: false,
      roleAndDetailsControl: false,
      parkingControl: false,
      fareControl: false,
      registerControl: false
    }, { emitEvent: false })

    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key)
      control?.setErrors(null)
      control?.markAsPristine()
      control?.markAsUntouched()
    })
    this.form.updateValueAndValidity({ emitEvent: false })
    this.selectRoles = [];
  }


  obtenerPerfiles(page: number, items: number) {
    this.userService.getProfiles(page, items).subscribe({
      next: (response) => {
        response.profiles.forEach((profile: any) => {
          profile.statusIcon = profile.status ? 'circle' : 'circle'
        })
        const totalRows = 10;
        const filledRows = [...response.profiles]
        while (filledRows.length < totalRows) {
          filledRows.push({ isEmpty: true })
        }
        this.profiles = new MatTableDataSource(filledRows)
        this.totalItems = response.totalElements
      },
      error: (error) => {
        console.error('Error al obtener perfiles:', error)
      }
    })
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.obtenerPerfiles(this.currentPage, this.pageSize);
  }

  ngAfterViewInit() {
    this.profiles.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.obtenerPerfiles(this.currentPage, this.pageSize);
  }


  getPerfil(profileId: number) {
    this.userService.getProfile(profileId).subscribe({
      next: (response) => {
        this.profileIdSelected = profileId;
        const roleIds = response.roles.map((role: any) => role.id);

        this.selectRoles = [];

        this.form.setValue({
          description: response.profile.description || '',
          status: response.profile.status,
          profileControl: roleIds.includes(1),
          usersControl: roleIds.includes(2),

          auditControl: roleIds.includes(3),
          roleAndDetailsControl: roleIds.includes(4),
          parkingControl: roleIds.includes(5),
          fareControl: roleIds.includes(6),
          registerControl: roleIds.includes(7)
        });

        this.selectRoles = [...roleIds]

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
            this.obtenerPerfiles(this.currentPage, this.pageSize)
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

  onToggleChange(event: MatSlideToggleChange) {
    const status = event.checked;  // True para habilitar, False para deshabilitar

    if (!status) {  // Si se va a deshabilitar
      Swal.fire({
        icon: 'warning',
        title: 'Deshabilitar perfil',
        text: "¿Está seguro de querer deshabilitar el perfil?",
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.disableProfile(status, this.profileIdSelected).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Perfil deshabilitado exitosamente'
              })
              this.resetForm()
              this.obtenerPerfiles(this.currentPage, this.pageSize)
            },
            error: (error) => {
              console.error('Error al desactivar perfil: ', error)
            }
          })
        }
      })
    } else {  // Si se va a habilitar
      this.userService.disableProfile(status, this.profileIdSelected).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('PROFILE.ALERT_ENABLED_PROFILE')
          })
          this.resetForm()
          this.obtenerPerfiles(this.currentPage, this.pageSize)
        },
        error: (error) => {
          console.error('Error al habilitar perfil: ', error)
        }
      })
    }
  }

  onSubmit() {
    this.newProfile();;
  }

  onToggleRole(roleId: number, event: any) {
    if (event.checked) {
      this.selectRoles.push(roleId);
      console.log(this.selectRoles)
    } else {
      this.selectRoles = this.selectRoles.filter(id => id !== roleId);
    }
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
          this.obtenerPerfiles(this.currentPage, this.pageSize)
          Swal.fire({
            title: this.translate.instant('ALERT_PROFILE.TITLE_ADD'),
            text: this.translate.instant('ALERT_PROFILE.MESSAGE_SUCCESS'),
            icon: 'success',
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
    const description = this.form.value.description;
    const status = true;
    const data = { description: description, status: status, }

    if (this.profileIdSelected) {
      this.userService.updateProfile(data, this.profileIdSelected, roles).subscribe({
        next: (response) => {
          Swal.fire({
            title: this.translate.instant('ALERT_PROFILE.TITLE_UPDATE'),
            text: this.translate.instant('ALERT_PROFILE.MESSAGE_UPDATE_SUCCESS'),
            icon: 'success',
          })
          this.obtenerPerfiles(this.currentPage, this.pageSize)
          this.resetForm()
        },
        error: (error) => {
          Swal.fire({
            title: this.translate.instant('ALERT_PROFILE.TITLE_BAD_UPDATE'),
            text: error,
            icon: 'error',
          })
          console.error(error)
        }
      })
    }
  }

  searchProfile() {
    const description = this.searchControl.value || '';
    this.userService.searchProfile(description, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        response.profiles.forEach((profile: any) => {
          profile.statusIcon = profile.status ? 'circle' : 'circle'
        })
        const totalRows = 10;
        const filledRows = [...response.profiles]
        while (filledRows.length < totalRows) {
          filledRows.push({ isEmpty: true })
        }
        this.profiles = new MatTableDataSource(filledRows)
        this.totalItems = response.totalElements
      },
      error: (error) => {
        console.error('Error al buscar perfiles: ', error)
      }
    })
  }
}
