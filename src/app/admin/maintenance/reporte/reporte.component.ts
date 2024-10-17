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
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReporteComponent implements AfterViewInit {
  displayedColumns: string[] = ['plate', 'startDate','endDate','more'];
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
  selectedParkingId: number | null = null;
  endDate: Date | null = null;
  @Input() totalElements: number = 0;



  selectedDateControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  parking: any[] = [];
  @Input() report: ReporteData[] = [];

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

  loadParkings() {
    this.reportService.getParkings().subscribe(
      (data: any) => {
        this.parking = data.content;
        console.log(this.parking)
      },
      (error: any) => {
        console.error("Error loading parkings", error);
      }
    );
  }



  applyParkingAndDateRangeFilter(): void {
    console.log('ID de Parqueo:', this.selectedParkingId);
    console.log('Fecha de Inicio:', this.startDate);
    console.log('Fecha de Fin:', this.endDate);

    if (this.selectedParkingId !== null && this.selectedParkingId > 0 && this.startDate && this.endDate) {
      const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
      const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

      console.log('Formatted Start Date:', formattedStartDate);
      console.log('Formatted End Date:', formattedEndDate);

      if (formattedStartDate && formattedEndDate) {
        this.reportService.getReportsByParkingAndDateRange(this.selectedParkingId, formattedStartDate, formattedEndDate).subscribe(
          (data: any) => {
            console.log('Reportes filtrados por parqueo y rango de fechas:', data);
            this.dataSource.data = data;
          },
          (error: any) => {
            console.error('Error al cargar reportes por parqueo y rango de fechas:', error);
          }
        );
      } else {
        console.error('Error al formatear las fechas');
      }
    } else {
      console.error('ID de parqueo o fechas no válidas');
      console.log('id:', this.selectedParkingId, 'ID de Parqueo:', this.selectedParkingId, 'Fecha de Inicio:', this.startDate, 'Fecha de Fin:', this.endDate);
    }
  }

  generatePdfReport(): void {
    console.log('Generando PDF para el parqueo:', this.selectedParkingId);
    console.log('Fecha de Inicio:', this.startDate);
    console.log('Fecha de Fin:', this.endDate);

    if (this.selectedParkingId !== null && this.selectedParkingId > 0 && this.startDate && this.endDate) {
      const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
      const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

      console.log('Formatted Start Date:', formattedStartDate);
      console.log('Formatted End Date:', formattedEndDate);

      if (formattedStartDate && formattedEndDate) {
        this.reportService.generatePdfReport(this.selectedParkingId, formattedStartDate, formattedEndDate).subscribe(
          (response: Blob) => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report-${this.selectedParkingId}-${formattedStartDate}-${formattedEndDate}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            console.log('PDF generado y descargado');
          },
          (error: any) => {
            console.error('Error al generar el PDF:', error);
          }
        );
      } else {
        console.error('Error al formatear las fechas');
      }
    } else {
      console.error('ID de parqueo o fechas no válidas');
    }
  }




  loadRegister(page: number): void {
    this.reportService.getReporters(this.itemsPerPage, page).subscribe(
      (data: any) => {
        this.dataSource.data = data.content || [];
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;

        this.paginator.length = this.totalElements;
        this.paginator.pageIndex = page;
        this.currentPage = page;

        console.log('Total Elements:', this.totalElements);
        console.log('Paginator Length:', this.paginator.length);
        console.log('Datos en la tabla:', page, this.dataSource.data);
        console.log('Total Pages:', this.totalPages);
      },
      (error: any) => {
        console.error('Error al cargar registros:', error);
      }
    );
  }

  convertpdf(): void {
    const doc = new jsPDF();
    const data = this.reportData;

    if (data) {
      doc.text(`Details for ${data.plate}`, 10, 10);
      doc.text(`ID: ${data.parkingId}`, 10, 20);
      doc.text(`Id de tarifa: ${data.fareId}`, 10, 30);
      doc.text(`Id de registro: ${data.registerId}`, 10, 40);
      doc.text(`Id de parqueo: ${data.parkingId}`, 10, 50);
      doc.text(`Total: ${data.total}`, 10, 60);
      doc.text(`StartDate: ${data.startDate}`, 10, 70);
      doc.text(`EndDate: ${data.endDate}`, 10, 80);

      doc.save(`report-${data.plate}.pdf`);
    }
  }


  ngOnInit() {
    this.loadRegister(0)
    this.loadParkings()
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
    this.loadRegister(event.pageIndex);
  }
}
