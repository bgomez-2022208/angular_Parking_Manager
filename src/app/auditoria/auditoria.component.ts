import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';

import { FormControl } from '@angular/forms';



export interface AuditData {
  id: string;
  entity: string;
  change: string;
  date: string;
}

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,MatInputModule,MatTableModule,MatSortModule,MatPaginatorModule,MatSidenavModule,
    MatSelectModule,MatButtonModule,MatSidenavModule,MatFormFieldModule,MatSelectModule,
    MatMenuModule,MatDatepickerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditoriaComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'entity', 'change', 'date'];
  dataSource: MatTableDataSource<AuditData>;
  selected= 'valor';
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const audit: AuditData[] = [
      { id: '1', entity: 'User', change: 'Updated password', date: '2023/09/01' },
      { id: '2', entity: 'User', change: 'Created account', date: '2023/09/02' },
      { id: '3', entity: 'Order', change: 'Deleted order', date: '2023/09/03' },
      { id: '4', entity: 'Product', change: 'Updated price', date: '2023/09/04' }
    ];

    this.dataSource = new MatTableDataSource(audit);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event | MatSelectChange | Date) {
    let filterValue = '';

    if (event instanceof Date) {
      const selectedDate = event;
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();

      filterValue = `${year}-${month}-${day}`;
    }
    else if (event instanceof MatSelectChange) {
      filterValue = event.value;
    }
    else if (event.target && (event.target as HTMLInputElement).value !== undefined) {
      filterValue = (event.target as HTMLInputElement).value;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() {
    this.dataSource.filterPredicate = (data: AuditData, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();

      const matchFilter =
        data.id.toLowerCase().includes(transformedFilter) ||
        data.entity.toLowerCase().includes(transformedFilter) ||
        data.change.toLowerCase().includes(transformedFilter) ||
        data.date.includes(transformedFilter);

      return matchFilter;
    };
  }

}
