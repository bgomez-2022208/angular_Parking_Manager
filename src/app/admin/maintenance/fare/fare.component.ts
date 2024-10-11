import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FareData, FareService } from '../../services/fare.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss']
})
export class FareComponent {
  dataSource: MatTableDataSource<FareData>;
  fareForm: FormGroup;

  constructor(private datePipe: DatePipe, private fareService: FareService, private fb: FormBuilder) {
    const fare: FareData[] = [];
    this.dataSource = new MatTableDataSource(fare);

    this.fareForm = this.fb.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      price: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log('submit');
    console.log('Submitted fare data:', this.fareForm.value);
    if (this.fareForm.valid) {
      const fareData: FareData = this.fareForm.value;
      this.fareService.createFare(fareData).subscribe({
        next: () => {
          this.fareForm.reset();
        },
        error: (err) => {
          console.error('Error al agregar la tarifa', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  onFareSelected(fare: FareData): void {
    // Asegúrate de que las propiedades coincidan con FareData
    console.log('Fare data received in FareComponent:', fare);
    this.fareForm.patchValue({
      name: fare.name,
      startTime: fare.startTime,
      endTime: fare.endTime,
      price: fare.price,
    });
    console.log('Fare data received in FareComponent:', fare);
  }


  ngOnInit() {

  }
}
