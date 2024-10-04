import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuditoryService, AuditData } from '../services/auditory.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditoriaComponent implements AfterViewInit {
  displayedColumns: string[] = ['entity', 'startDate', 'description', 'operation', 'result', 'request', 'response'];
  dataSource: MatTableDataSource<AuditData>;
  selected: string = ''; 
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();

  selectedDateControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private datePipe: DatePipe,private auditoryService: AuditoryService) {
    const audit: AuditData[] = [
      { id:'1', entity: 'User', startDate: new Date('2024-09-01'), description: 'Description 1', operation: 'Create', result: 'Success', request: 'Request data', response: 'Response data' },
      { id:'1', entity: 'Product', startDate: new Date('2024-09-02'), description: 'Description 2', operation: 'Update', result: 'Failure', request: 'Request data', response: 'Response data' }
    ];

    this.dataSource = new MatTableDataSource(audit);
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

  applyDateFilter(selectedDate: Date) {
    if (selectedDate) {
      const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
      this.dataSource.filter = formattedDate ? formattedDate.trim().toLowerCase() : '';
    }
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  ngOnInit() {
    // Llama al servicio para obtener los datos
    this.auditoryService.getAuditory().subscribe((data: AuditData[]) => {
      this.dataSource.data = data;
    });

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
}
