import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuditoryService, AuditData } from '../../services/auditory.service';
import { audit } from 'rxjs';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditoriaComponent implements OnInit{
  displayedColumns: string[] = ['entity', 'startDate', 'description', 'operation', 'result', 'more'];
  expandedElement: any | null = null;
  auditData: AuditData | null = null;
  dataSource: MatTableDataSource<AuditData>;
  selected: string = '';
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();
  showCard: boolean = false;
  @Input() audith: AuditData[] = [];
  @Input() itemsPerPage: number = 8;
  @Output() pageChange = new EventEmitter<number>();
  @Input() totalPages: number = 1;
  searchQuery: string = "";
  currentPage: number = 0;
  pageIndex=0;


  selectedDateControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() totalElements: number = 0;
  private totalAudits: number =0;

  constructor(private datePipe: DatePipe,private auditoryService: AuditoryService) {
    const audit: AuditData[] = [];

    this.dataSource = new MatTableDataSource<AuditData>(this.audith || []);
    this.selectedDateControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });
  }




  applyFilter(event: Event | MatSelectChange | Date) {
    let filterValue = '';
    if (event instanceof Event) {
      filterValue = (event.target as HTMLInputElement).value; // Asignar valor del input
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyEntityFilter(event: MatSelectChange): void {
    const entity = event.value;
    console.log('Entidad seleccionada:', entity);

    if (entity) {
      this.auditoryService.getAuditoryByEntity(entity).subscribe(
        (data: any) => {
          console.log('cantidad',data)
          this.audith = data;
          this.totalPages = data.totalPages;
          this.currentPage = data.currentPage;
          console.log('Auditorías filtradas por entidad:', this.audith);
          this.dataSource.data = this.audith;
        },
        (error: any) => {
          console.error('Error al cargar auditorías por entidad:', error);
        }
      );
    } else {
      this.loadAudits(8);
    }
  }

  applyDateFilter(selectedDate: Date) {
    if (selectedDate) {
      const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
      this.dataSource.filter = formattedDate ? formattedDate.trim().toLowerCase() : '';
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  loadAudits(page: number): void {
    this.auditoryService.getAuditory(this.itemsPerPage, page).subscribe(
      (data: any) => {
        this.dataSource.data = data.audiths || [];
        this.totalElements = data.totalElements;

        this.paginator.length = this.totalElements;
        this.paginator.pageIndex = page;
        this.currentPage = page;

        // Depuración
        console.log('Datos en la tabla:', page, this.dataSource.data);
        console.log('Total Elements:', this.totalElements);
        console.log('Paginator Length:', this.paginator.length);
      },
      (error: any) => {
        console.error('Error al cargar auditorías:', error);
      }
    );
  }








  ngOnInit() {

    this.loadAudits(0);
    this.dataSource.filterPredicate = (data: AuditData, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const dateString = this.formatDate(data.startDate);

      return data.entity.toLowerCase().includes(transformedFilter) ||
             data.description.toLowerCase().includes(transformedFilter) ||
             data.operation.toLowerCase().includes(transformedFilter) ||
             data.result.toLowerCase().includes(transformedFilter) ||
             (dateString ? dateString.includes(transformedFilter) : false);
    };

    this.selectedDateControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });
  }
  formatDate(date: Date | string): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  onMoreClick(id: string) {
    console.log('ID received:', id);
    this.auditoryService.getAuditoryById(id).subscribe({
      next: (data: AuditData) => {
        this.auditData = data;
        this.showCard = true;
        console.log('Audit Data:', this.auditData);
      },
      error: (err) => {
        console.error('Error al obtener la auditoría:', id);
      }
    });
  }
  closeCard() {
    this.showCard = false;
  }
  changePage(event: PageEvent): void {
    this.loadAudits(event.pageIndex);
  }
}
