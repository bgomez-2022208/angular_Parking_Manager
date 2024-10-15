import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ApiUserService } from 'src/app/user/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {

  form: FormGroup;
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  displayedColumns: string[] = ['status', 'name']
  parkingIdSelected: number = 0;
  parkingDataSelect: any = null;
  parkings = new MatTableDataSource<any>()
  searchControl = new FormControl('')

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private translate: TranslateService, private userService: ApiUserService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, this.noWhiteSpaceValidator, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+([ A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/)]], // Solo letras y no espacios en blanco
      address: ['', [Validators.required, this.noWhiteSpaceValidator]], // No solo espacios en blanco
      phone: ['', [Validators.required, this.noWhiteSpaceValidator, Validators.pattern(/^[0-9]{8}$/)]], // Solo números, no espacios en blanco
      spaces: ['', [Validators.required, this.noWhiteSpaceValidator, Validators.pattern(/^\d+$/)]], // Solo números, no espacios en blanco
      status: [true, Validators.required]
    })
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
    const control = this.form.get(controlName)

    if (control?.hasError('required')) {
      return controlName === 'name' ? this.translate.instant('PARKING.ERROR_NAME_PARKING_REQUIRED') :
        controlName === 'address' ? this.translate.instant('PARKING.ERROR_ADDRESS_PARKING_REQUIRED') :
          controlName === 'phone' ? this.translate.instant('PARKING.ERROR_PHONE_PARKING_REQUIRED') :
            controlName === 'spaces' ? this.translate.instant('PARKING.ERROR_SPACES_PARKING_REQUIRED') : ''
    }

    if (control?.hasError('pattern')) {
      return controlName === 'name' ? this.translate.instant('PARKING.ERROR_NAME_PARKING_INVALID') :
        controlName === 'phone' ? this.translate.instant('PARKING.ERROR_PHONE_PARKING_INVALID') :
          controlName === 'spaces' ? this.translate.instant('PARKING.ERROR_SPACES_PARKING_INVALID') :
            controlName === 'address' ? this.translate.instant('PARKING.ERROR_ADDRESS_PARKING_INVALID') : ''
    }

    if (control?.hasError('whitespace')) {
      return controlName === 'name' ? this.translate.instant('PARKING.ERROR_NAME_PARKING_INVALID') :
        controlName === 'address' ? this.translate.instant('PARKING.ERROR_ADDRESS_PARKING_INVALID') :
          controlName === 'phone' ? this.translate.instant('PARKING.ERROR_PHONE_PARKING_INVALID') :
            controlName === 'spaces' ? this.translate.instant('PARKING.ERROR_SPACES_PARKING_INVALID') : ''
    }

    return ''
  }

  resetForm(): void {
    this.parkingIdSelected = 0;
    
    this.form.reset({
      name: '',
      address: '',
      phone: '',
      spaces: 0,
      status: false
    }, { emitEvent: false })
  
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key)
      control?.setErrors(null)
      control?.markAsPristine()
      control?.markAsUntouched()
    })
    
    this.form.updateValueAndValidity({ emitEvent: false })
  }

  obtenerParqueos(page: number, items: number): void {
    this.userService.getParkings(page, items).subscribe({
      next: (response) => {
        response.content.forEach((parking: any) => {
          parking.statusIcon = parking.status ? 'circle' : 'circle'
        })
  
        const totalRows = 10
        const filledRows = [...response.content]
  
        while (filledRows.length < totalRows) {
          filledRows.push({ isEmpty: true })
        }
  
        this.parkings = new MatTableDataSource(filledRows)
        this.totalItems = response.totalElements
        console.log(response)
      },
      error: (error) => {
        console.error('Error al obtener parqueos:', error)
      }
    })
  }

  searchParking() {
    const name = this.searchControl.value || '';
    this.userService.searchParking(name, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        response.content.forEach((parking: any) => {
          parking.statusIcon = parking.status ? 'circle' : 'circle'
        })
        const totalRows = 10
        const filledRows = [...response.content]
  
        while (filledRows.length < totalRows) {
          filledRows.push({ isEmpty: true })
        }
  
        this.parkings = new MatTableDataSource(filledRows)
        this.totalItems = response.totalElements
        console.log(response)
      },
      error: (error) => {
        console.error('Error al buscar parqueos:', error);
      }
    })
  }

  updateParking() {
    const parking = this.form.value
    if (this.parkingIdSelected && this.form.valid) {
      this.userService.updateParking(parking, this.parkingIdSelected).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('PARKING.ALERT_UPDATE_TITLE'),
            text: this.translate.instant('PARKING.ALERT_UPDATE_MESSAGE'),
            timer: 3000
          })
          this.resetForm()
          this.parkingIdSelected = 0;
          this.obtenerParqueos(this.currentPage, this.pageSize)
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('PARKING.ALERT_ERROR_UPDATE_TITLE'),
            text: this.translate.instant('PARKING.ALERT_ERROR_UPDATE_MESSAGE'),
            timer: 3000
          })
        }
      })
    }
  }

  seleccionarParqueo(id: number) {
    this.userService.getParking(id).subscribe({
      next: (response) => {
        this.parkingIdSelected = id

        this.form.setValue({
          name: response.name || '',
          address: response.address || '',
          phone: response.phone || '',
          spaces: response.spaces || '',
          status: response.status || false
        })
      },
      error: (error) => {
        console.error('Error al obtener parqueo:', error)
      }
    })
  }

  addParking() {
    if (this.form.valid) {
      const parking = this.form.value;
      this.userService.newParking(parking).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('PARKING.ALERT_SUCCESS_TITLE'),
            text: this.translate.instant('PARKING.ALERT_SUCCESS_MESSAGE'),
          })
          this.resetForm();
          this.obtenerParqueos(this.currentPage, this.pageSize)
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('PARKING.ALERT_ERROR_TITLE'),
            text: this.translate.instant('PARKING.ALERT_ERROR_MESSAGE'),
          })
          console.error(error)
          this.resetForm();
        }
      })
    }
  }

  onToggleChange(event: MatSlideToggleChange) {
    const status = event.checked;

    if(!status){

      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('PARKING.ALERT_DISABLE_PARKING_TITLE'),
        text: this.translate.instant('PARKING.ALERT_DISABLE_PARKING_MESSAGE'),
        confirmButtonText: this.translate.instant('PARKING.ALERT_DISABLE_YES'),
        cancelButtonText: this.translate.instant('PARKING.ALERT_DISABLE_NO'),
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.disableParking(status, this.parkingIdSelected).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: this.translate.instant('PARKING.ALERT_DISABLED_PARKING')
              })
              this.resetForm()
              this.obtenerParqueos(this.currentPage, this.pageSize);
            },
            error: (error) => {
              console.error('Error al desactivar parqueo:', error)
            }
          })
          this.obtenerParqueos(this.currentPage, this.pageSize);
        }
        this.resetForm()
      })
    } else {
      this.userService.disableParking(status, this.parkingIdSelected).subscribe({
        next: (response)=>{
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('PARKING.ALERT_ENABLED_PARKING')
          })
          this.resetForm()
          this.obtenerParqueos(this.currentPage, this.pageSize)
        },
        error: (error)=>{
          console.error('Error al activar parqueo:', error)
        }
      })
    }
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.obtenerParqueos(this.currentPage, this.pageSize);
  }

  ngOnInit(): void {
    this.obtenerParqueos(this.currentPage, this.pageSize);
  }

  ngAfterViewInit() {
    this.parkings.paginator = this.paginator;
  }

  onSubmit() {
    this.addParking()
  }

}
