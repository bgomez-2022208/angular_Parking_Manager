import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FareData, FareService } from '../../services/fare.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';
import { FareTableComponent } from '../components/fare-table/fare-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
  @Output() fareUpdated = new EventEmitter<void>();
  @ViewChild(FareTableComponent) fareTable!: FareTableComponent;
  searchControl = new FormControl('')
  totalItems: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;


  constructor(private datePipe: DatePipe, private fareService: FareService, private fb: FormBuilder,private router: Router,private route: ActivatedRoute,private translate: TranslateService) {
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
  @Input() fare?: FareData[];
  fareSelected: boolean = false;

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
            this.onFareUpdated();
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
            this.onFareUpdated();
            window.location.reload();
          },
          (error) => {
            Swal.fire('Error', 'Failed to create fare', 'error');
            console.error('Error creating fare:', error);
          }
        );
      }
    }
  }

  getErrorMessage(controlName: string){
    const control = this.fareForm.get(controlName);

    if (control?.hasError('required')) {
      switch (controlName) {
        case 'name':
          return this.translate.instant('ERRORS.ERROR_NAME_REQUIRED');
        case 'startTime':
          return this.translate.instant('ERRORS.ERROR_STARTTIME_REQUIRED');
        case 'price':
          return this.translate.instant('ERRORS.ERROR_PRICE_REQUIRED');
        case 'endTime':
          return this.translate.instant('ERRORS.ERROR_ENDTIME_REQUIRED');
        default:
          return '';
      }
    }

    if (controlName === 'name' && control?.hasError('name')) {
      return this.translate.instant('ERRORS.ERROR_INVALID_EMAIL');
    }
    return '';
  }

  onFareUpdated() {
    this.fareTable.loadFares(this.fareTable.currentPage);
  }

  resetForm(): void {
    this.fareForm.reset();
    this.fareId = 0;
    this.isEditing = false;
    this.fareSelected = false;
  }



  onFareSelected(fare: FareData): void {
    console.log('Fare data received in FareComponent:', fare);
    this.isEditing = true;
    this.fareSelected = true;
    this.fareId = fare.fareId;
    this.fareForm.patchValue({
      name: fare.name,
      startTime: fare.startTime,
      endTime: fare.endTime,
      price: fare.price,
      status: fare.status
    });
    console.log('Fare data received in FareComponent:', fare);
  }

  CancelUpdate() {
    this.fareForm.reset();
    this.fareSelected=false;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }

  onToggleChange(event: MatSlideToggleChange, fare: FareData){
    const newStatus = event.checked;
    const updatedFareData: FareData = { ...fare, status: newStatus };
    if(!newStatus){
      Swal.fire({
        icon:'warning',
        title: this.translate.instant('FARE.ALERT_DISABLE_FARE_TITLE'),
        text: this.translate.instant('FARE_ALERT_DISABLE_FARE_MESSAGE'),
        confirmButtonText: this.translate.instant('FARE.ALERT_DISABLE_YES'),
        cancelButtonText: this.translate.instant('FARE.ALERT_DISABLE_NO'),
        showCancelButton: true,
      }).then((result) => {
        this.fareService.updateFare(this.fareId ,updatedFareData).subscribe({
          next: (response) => {
            Swal.fire({
              icon:'success',
              title: this.translate.instant('FARE.ALERT_DISABLED_FARE')
            })
            this.resetForm()
            this.onFareUpdated()
          },
          error: (error) => {
            console.log('Error al desactivar la tarifa:',error)
          }
        })
        this.resetForm()
      })
    } else {
      this.fareService.updateFare(this.fareId,updatedFareData).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('FARE.ALERT_ENABLED_FARE')
          })
          this.resetForm()
          this.onFareUpdated()
        },
        error: (error) => {
          console.log('Error al activar el registro:',error)
        }
      })
    }
  }


  ngOnInit() {

  }
}
