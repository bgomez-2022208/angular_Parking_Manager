import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FareService, FareData} from '../../../services/fare.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fare-table',
  templateUrl: './fare-table.component.html',
  styleUrls: ['./fare-table.component.scss']
})
export class FareTableComponent {
  @Input() fare: FareData[] = [];
  @Input() itemsPerPage: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Input() totalPages: number = 0;
  searchQuery: string = "";

  constructor(private fareService: FareService,
              private dialog: MatDialog,
              private translate: TranslateService,
              private router: Router) {}

  @Input() currentPage: number = 1;
  @Input() profiles!: any[];
  @Input() itemsPerPageOptions!: number[];
  @Output() profileSelected = new EventEmitter<number>();
  @Output() profileDeleted = new EventEmitter<number>();

  ngOnInit(): void {
    this.fareService.getAllFare().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.fare = data.users;
        console.log('hello, this is: ', this.fare);
        this.totalPages = data.totalPages;
      },
      (error: any) => {
        console.error('Error al cargar tarifas:', error);
      }
    );
  }




}
