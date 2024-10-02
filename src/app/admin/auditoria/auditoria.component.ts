import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

export interface AuditData {
  id: string;
  entity: string;
  change: string;
  date: Date;
  description: string;
}

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditoriaComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'entity', 'change', 'date','description'];
  dataSource: MatTableDataSource<AuditData>;
  selected: string = ''; 
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();

  selectedDateControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private datePipe: DatePipe) {
    const audit: AuditData[] = [
      { id: '1', entity: 'User', change: 'Updated password', date: new Date('2024-09-01'),description: 'Successfully loaded user by email: juangalicia@gmail.com'},
      { id: '2', entity: 'User', change: 'Created account', date: new Date('2023-09-02'),description: 'Successfully loaded user by email: juangalicia@gmail.com'},
      { id: '3', entity: 'Profile', change: 'Deleted order', date: new Date('2023-09-03'),description: 'Successfully loaded user by email: juangalicia@gmail.com'},
      { id: '4', entity: 'Product', change: 'Updated price', date: new Date('2023-09-04'),description: 'Successfully loaded user by email: juangalicia@gmail.com'}
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
    this.dataSource.filterPredicate = (data: AuditData, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const dateString = this.formatDate(data.date);

      const matchFilter =
        data.id.toLowerCase().includes(transformedFilter) ||
        data.entity.toLowerCase().includes(transformedFilter) ||
        data.change.toLowerCase().includes(transformedFilter) ||
        (dateString ? dateString.includes(transformedFilter) : false);

      return matchFilter;
    };
  }
  formatDate(date: Date | string): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
