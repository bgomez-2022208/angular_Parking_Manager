import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from "../../../../user/services/user.service";
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-filter-salida',
  templateUrl: './filter-salida.component.html',
  styleUrls: ['./filter-salida.component.scss']
})
export class FilterSalidaComponent {
  parkingForm: FormGroup;

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<FilterSalidaComponent>,
    private apiUserService: ApiUserService,
    private bb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.parkingForm = this.bb.group({
      plate: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close('confirmado');
  }

  onSubmit(): void {
    if (this.parkingForm.valid) {
      const placaData = {
        plate: this.parkingForm.value.plate
      };
      console.log("probando falso submit", this.parkingForm.value.plate);

      this.apiUserService.salidaParking(placaData).subscribe(
        (salidaParking) => {
          this.parkingForm.reset();
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('REGISTER_PARKING.ALERT_SUCCESS.TITLE'),
            text: this.translate.instant('REGISTER_PARKING.ALERT_SUCCESS.MESSAGE_EXIT'),
            timer: 3000,
            showConfirmButton: false
          });
          this.dialogRef.close();
        },
        (error) => {
          if (error.status === 409) {
            Swal.fire({
              icon: 'warning',
              title: this.translate.instant('REGISTER_PARKING.ALERT_WARNING.TITLE'),
              text: this.translate.instant('REGISTER_PARKING.ALERT_WARNING.MESSAGE_DUPLICATE'),
              timer: 3000,
              showConfirmButton: false
            });
          } else {
            console.error("Error creando salida de parqueo", error);
            Swal.fire({
              icon: 'error',
              title: this.translate.instant('REGISTER_PARKING.ALERT_ERROR.TITLE'),
              text: this.translate.instant('REGISTER_PARKING.ALERT_ERROR.MESSAGE_EXIT'),
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    }
  }


  getErrorMessage(controlName: string) {
    const control = this.parkingForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo es requerido.';
    }
    return '';
  }
}
