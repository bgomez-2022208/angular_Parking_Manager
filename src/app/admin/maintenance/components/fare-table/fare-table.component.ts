import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FareService, FareData} from '../../../services/fare.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuditData } from '../../../services/auditory.service';
import { DeleteFareComponent } from '../delete-fare/delete-fare.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fare-table',
  templateUrl: './fare-table.component.html',
  styleUrls: ['./fare-table.component.scss']
})
export class FareTableComponent {
  @Input() fare: FareData[] = [];
  fareData: FareData | null = null;
  @Output() pageChange = new EventEmitter<number>();
  @Input() totalPages: number = 0;
  @Input() itemsPerPage: number = 10;
  searchQuery: string = "";
  @Input() totalElements: number = 0;
  dataSource: MatTableDataSource<FareData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() selectedFareId = new EventEmitter<number>();
  @Output() fareSelected = new EventEmitter<FareData>();
  displayedColumns: string[] = ['status', 'description'];
  searchControl = new FormControl('');
  totalItems: number = 0;
  pageSize: number = 10;
  fares = new MatTableDataSource<any>()

  constructor(private fareService: FareService,
              private dialog: MatDialog,
              private translate: TranslateService,
              private router: Router) {
    this.dataSource = new MatTableDataSource<FareData>(this.fare || []);

  }

  @Input() currentPage: number = 1;
  @Input() profiles!: any[];
  @Input() itemsPerPageOptions!: number[];
  @Output() profileSelected = new EventEmitter<number>();
  @Output() profileDeleted = new EventEmitter<number>();

  ngOnInit(page: number): void {
    this.loadFares(0)
  }

  loadFares(page: number): void {
    this.fareService.getAllFare(this.itemsPerPage, page).subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.dataSource.data = data.fares || [];
        this.fare = this.dataSource.data;
        this.totalElements = data.totalElements;

        this.paginator.length = this.totalElements;
        this.paginator.pageIndex = page;
        this.currentPage = page;


        console.log('Datos en la tabla:', page, this.dataSource);
        console.log('Total Elements:', this.totalElements);
        console.log('Paginator Length:', this.paginator.length);
      },
      (error: any) => {
        console.error('Error al cargar tarifas:', error);
      }
    );
  }

  changePage(event: PageEvent): void {
    this.loadFares(event.pageIndex);
  }
/*
  getFareById(fareId: number) {
    const queryParams = {
      fareId: fareId,
    };
    console.log("envios", queryParams)
    this.router.navigate([], { queryParams });
    this.selectedFareId.emit(fareId);

  }*/
  getFareById(fareId: number) {
    this.fareService.getFareById(fareId).subscribe({
      next: (fare: FareData) => {
        this.fareSelected.emit(fare);
      },
      error: (err) => {
        console.error('Error fetching fare data', err);
      }
    });
  }

  openDeletetDialog(userId: number): void {
    const dialogRef = this.dialog.open(DeleteFareComponent, {
      width: '300px',
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFares(this.currentPage);
      }
    });
  }

  searchFare() {
    const description = this.searchControl.value || '';
    this.fareService.searchFare(description, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        response.fares.forEach((profile: any) => {
          profile.statusIcon = profile.status ? 'circle' : 'circle'
        })
        const totalRows = 10;
        const filledRows = [...response.profiles]
        while (filledRows.length < totalRows) {
          filledRows.push({ isEmpty: true })
        }
        this.fares = new MatTableDataSource(filledRows)
        this.totalItems = response.totalElements
      },
      error: (error) => {
        console.error('Error al buscar perfiles: ', error)
      }
    })
  }
  /*onToggleChange(event: MatSlideToggleChange){
    const status = event.checked;
    if(!status){
      Swal.fire({
        icon:'warning',
        title: this.translate.instant('FARE.ALERT_DISABLE_FARE_TITLE'),
        text: this.translate.instant('FARE_ALERT_DISABLE_FARE_MESSAGE'),
        confirmButtonText: this.translate.instant('FARE.ALERT_DISABLE_YES'),
        cancelButtonText: this.translate.instant('FARE.ALERT_DISABLE_NO'),
        showCancelButton: true,
      }).then((result) => {
        this.fareService.disabledFare(status, this.fareSelected).subscribe({
          next: (response) => {
            Swal.fire({
              icon:'success',
              title: this.translate.instant('FARE.ALERT_DISABLED_FARE')
            })
            //this.resetForm()
            this.loadFares(this.currentPage)
          },
          error: (error) => {
            console.log('Error al desactivar la tarifa:',error)
          }
        })
        //this.resetForm()
      })
    } else {
      this.fareService.disabledFare(status, this.fareId).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('FARE.ALERT_ENABLED_FARE')
          })
          //this.resetForm()
          this.loadFares(this.currentPage)
        },
        error: (error) => {
          console.log('Error al activar el registro:',error)
        }
      })
    }
  }*/
}
