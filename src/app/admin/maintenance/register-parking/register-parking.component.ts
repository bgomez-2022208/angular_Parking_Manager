import { Component, OnInit} from '@angular/core';
import { ApiUserService } from '../../../user/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FilterSalidaComponent } from '../components/filter-salida/filter-salida.component';

@Component({
  selector: 'app-register-parking',
  templateUrl: './register-parking.component.html',
  styleUrls: ['./register-parking.component.scss']
})
export class RegisterParkingComponent implements OnInit {
  parkingForm: FormGroup;
  parking: any[] = [];

  constructor(
    public dialog: MatDialog,
    private apiUserService: ApiUserService,
    private translate: TranslateService,
    private fb: FormBuilder,
  ){
    this.parkingForm = this.fb.group({
      plate: ['', [Validators.required]],
      parkingId: ['', Validators.required],

    });
  }


  ngOnInit(): void {
    this.loadParkings();
  }

  loadParkings() {
    this.apiUserService.getParkingsRegister().subscribe(
      (data: any) => {
        this.parking = data.content;
        console.log(this.parking)
      },
      (error: any) => {
        console.error("Error loading parkings", error);
      }
    );
  }

  onSubmit() {
    if (this.parkingForm.valid) {
      const formData = this.parkingForm.value;

      this.apiUserService.createParking(formData).subscribe(
        () => {
          this.parkingForm.reset();
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('REGISTER_PARKING.ALERT_SUCCESS.TITLE'),
            text: this.translate.instant('REGISTER_PARKING.ALERT_SUCCESS.MESSAGE'),
            timer: 3000,
            showConfirmButton: false
          });
        },
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('REGISTER_PARKING.ERRORS.REQUIRED_FIELD'),
        text: this.translate.instant('REGISTER_PARKING.FORM.LABEL_PLATE'),
        timer: 3000,
        showConfirmButton: false
      });
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(FilterSalidaComponent, {
      width: '500px',
      height: '300px',
      data: { message: 'Confirma la salida del parking' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
      console.log('Resultado:', result);
    });
  }
}
