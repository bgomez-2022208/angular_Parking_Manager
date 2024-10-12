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
  displayedColumns: string[] = ['entity', 'startDate', 'operation', 'result', 'more'];
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
  startDate: Date | null = null;
  endDate: Date | null = null;


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

  applyDateRangeFilter(): void {
    if (this.startDate && this.endDate) {
      const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-ddTHH:mm:ss.SSSSSS');
      const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-ddTHH:mm:ss.SSSSSS');

      if (formattedStartDate && formattedEndDate) {
        this.auditoryService.getAuditoryByDateRange(formattedStartDate, formattedEndDate, this.itemsPerPage, this.currentPage).subscribe(
          (data: any) => {
            console.log('Auditorías filtradas por rango de fechas:', data);
            this.audith = data.audiths;
            this.totalElements = data.totalElements;
            this.totalPages = data.totalPages;

            this.dataSource.data = this.audith;

            if (this.paginator) {
              this.paginator.length = this.totalElements;
              this.paginator.pageIndex = this.currentPage;
            }
          },
          (error: any) => {
            console.error('Error al cargar auditorías por rango de fechas:', error);
          }
        );
      } else {
        console.error('Error al formatear las fechas');
      }
    } else {
      console.error('Fechas de inicio o fin no válidas');
    }
  }



  applyFilter(event: Event | MatSelectChange | Date) {
    let filterValue = '';
    if (event instanceof Event) {
      filterValue = (event.target as HTMLInputElement).value;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyEntityFilter(event: MatSelectChange): void {
    const entity = event.value;
    console.log('Entidad seleccionada:', entity);

    const currentPage = this.currentPage;

    if (entity) {
      this.auditoryService.getAuditoryByEntity(entity, this.itemsPerPage, currentPage).subscribe(
        (data: any) => {
          console.log('Cantidad de auditorías filtradas por entidad:', data);
          this.audith = data.audiths;
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;

          this.dataSource.data = this.audith;

          console.log(this.audith)

          if (this.paginator) {
            this.paginator.length = this.totalElements;
            this.paginator.pageIndex = currentPage;
          }
        },
        (error: any) => {
          console.error('Error al cargar auditorías por entidad:', error);
        }
      );
    } else {
      this.loadAudits(this.currentPage);
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
