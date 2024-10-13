import { Component, OnInit} from '@angular/core';
import { ApiUserService } from '../../../user/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-parking',
  templateUrl: './register-parking.component.html',
  styleUrls: ['./register-parking.component.scss']
})
export class RegisterParkingComponent implements OnInit {
  parkingForm: FormGroup;
  parking: any[] = [];

  constructor(
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
    this.apiUserService.getParkings().subscribe(
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
            title: 'Registro exitoso',
            text: 'El parqueo ha sido registrado correctamente.',
            timer: 3000,
            showConfirmButton: false
          });
        },
        (error) => {
          if (error.status === 409) {
            Swal.fire({
              icon: 'warning',
              title: 'Registro duplicado',
              text: 'El parqueo ya está registrado.',
              timer: 3000,
              showConfirmButton: false
            });
          } else {
            console.error("Error al crear el parqueo", error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al registrar el parqueo.',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, complete todos los campos obligatorios.',
        timer: 3000,
        showConfirmButton: false
      });
    }
  }

}
