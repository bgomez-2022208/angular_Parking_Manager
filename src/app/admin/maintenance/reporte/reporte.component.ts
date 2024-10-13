import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatSelectChange } from '@angular/material/select';
import { ReportService, ReporteData} from '../../services/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReporteComponent implements AfterViewInit {
  displayedColumns: string[] = ['plate', 'startDate','more'];
  expandedElement: any | null = null;
  reportData: ReporteData | null = null;
  dataSource: MatTableDataSource<ReporteData>;
  selected: string = '';
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();
  showCard: boolean = false;
  @Input() itemsPerPage: number = 8;
  @Output() pageChange = new EventEmitter<number>();
  @Input() totalPages: number = 1;
  searchQuery: string = "";
  currentPage: number = 0;
  pageIndex=0;
  startDate: Date | null = null;
  endDate: Date | null = null;
  @Input() totalElements: number = 0;


  selectedDateControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private datePipe: DatePipe,private reportService: ReportService) {
    const report: ReporteData[] = [];

    this.dataSource = new MatTableDataSource(report);
    this.selectedDateControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event | MatSelectChange | Date) {
    let filterValue = '';

    if (event instanceof Date) {
      filterValue = this.datePipe.transform(event, 'yyyy-MM-dd') || '';
    } else if (event instanceof MatSelectChange) {
      filterValue = event.value;
    } else if (event.target && (event.target as HTMLInputElement).value !== undefined) {
      filterValue = (event.target as HTMLInputElement).value;
    }

    console.log('Filter Value:', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAudits(page: number): void {
    this.reportService.getReporters(this.itemsPerPage, page).subscribe(
      (data: any) => {
        this.dataSource.data = data.content || [];
        this.totalElements = data.totalElements;

        console.log('date:',data.content)

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
    this.loadAudits(0)
  }
  onMoreClick(id: string) {
    console.log('ID received:', id);
    this.reportService.getRegisterById(id).subscribe({
      next: (data: ReporteData) => {
        this.reportData = data;
        this.showCard = true;
        console.log(this.reportData)
        console.log('Report Data:', this.reportData);
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
