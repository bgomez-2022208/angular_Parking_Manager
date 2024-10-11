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
  fareForm: FormGroup

  constructor(private datePipe: DatePipe,private fareService: FareService, private fb: FormBuilder) {
    const fare: FareData[] = [];
    // private fareService: FareService

    this.dataSource = new MatTableDataSource(fare);

    this.fareForm = this.fb.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      price: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }
  onSubmit(): void {
    console.log('submit')
    if (this.fareForm.valid) {
      const fareData: FareData = this.fareForm.value; // Obtén los valores del formulario
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



  ngOnInit(){
  }

}
