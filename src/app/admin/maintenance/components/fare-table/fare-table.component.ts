import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FareService, FareData} from '../../../services/fare.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['status', 'name'];
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
  @Input() faresSearch!: any[];
  @Input() itemsPerPageOptions!: number[];
  @Output() profileSelected = new EventEmitter<number>();
  @Output() profileDeleted = new EventEmitter<number>();

  ngOnInit(page: number): void {
    this.loadFares(0);
  }

  loadFares(page: number): void {
    this.fareService.getAllFare(this.itemsPerPage, page).subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.dataSource.data = data.fares || [];
        this.totalElements = data.totalElements;

        this.paginator.length = this.totalElements;
        this.paginator.pageIndex = page;
        this.currentPage = page;

        console.log('Datos en la tabla:', page, this.dataSource.data);
        console.log('Total Elements:', this.totalElements);
        console.log('Paginator Length:', this.paginator.length);
      },
      (error: any) => {
        console.error('Error al cargar tarifas:', error);
      }
    );
  }


  searchFare() {
    const name = this.searchControl.value || '';
    this.fareService.searchFare(name, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        const filledRows = response.fares || [];
        this.dataSource.data = filledRows;
        this.totalItems = response.totalElements;

        console.log('Datos en la tabla después de búsqueda:', this.dataSource.data);
      },
      error: (error) => {
        console.error('Error al buscar tarifas: ', error);
      }
    });
  }


  changePage(event: PageEvent): void {
    this.loadFares(event.pageIndex);
  }

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

}
