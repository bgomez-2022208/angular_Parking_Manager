import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FareData, FareService } from '../../services/fare.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss']
})
export class FareComponent {
  dataSource: MatTableDataSource<FareData>;
  fareForm: FormGroup;
  isEditing = false;
  private fareId: number = 0;

  constructor(private datePipe: DatePipe, private fareService: FareService, private fb: FormBuilder) {
    const fare: FareData[] = [];
    this.dataSource = new MatTableDataSource(fare);

    this.fareForm = this.fb.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      price: ['', Validators.required],
      endTime: ['', Validators.required],
      status: [false,Validators.required]
    });
  }

  isEdit: boolean = false;
  selectedFareId: number | null = null;

  onSubmit() {
    if (this.fareForm.valid) {
      console.log('isEditing:', this.isEditing);
      console.log('fareId:', this.fareId);
      const fareData: FareData = {
        fareId: this.isEditing ? this.fareId : 0,
        name: this.fareForm.value.name,
        startTime: this.fareForm.value.startTime,
        endTime: this.fareForm.value.endTime,
        price: Number(this.fareForm.value.price),
        status: this.fareForm.value.status
      };

      if (this.isEditing) {
        this.fareService.updateFare(this.fareId, fareData).subscribe(
          () => {
            Swal.fire('Success', 'Fare updated successfully', 'success');
            this.resetForm();
          },
          (error) => {
            Swal.fire('Error', 'Failed to update fare', 'error');
            console.error('Error updating fare:', error);
          }
        );
      } else {
        this.fareService.createFare(fareData).subscribe(
          () => {
            Swal.fire('Success', 'Fare created successfully', 'success');
            this.resetForm();
          },
          (error) => {
            Swal.fire('Error', 'Failed to create fare', 'error');
            console.error('Error creating fare:', error);
          }
        );
      }
    }
  }

  resetForm(): void {
    this.fareForm.reset();
    this.fareId = 0;
    this.isEditing = false;
  }



  onFareSelected(fare: FareData): void {
    console.log('Fare data received in FareComponent:', fare);
    this.isEditing = true;  // Cambia el estado para indicar que estamos editando
    this.fareId = fare.fareId;
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
