import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FareData, FareService } from '../../services/fare.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss']
})
export class FareComponent {
  dataSource: MatTableDataSource<FareData>;

  constructor(private datePipe: DatePipe,private fareService: FareService) {
    const fare: FareData[] = [];

    this.dataSource = new MatTableDataSource(fare);
  }

  ngOnInit(){
    this.fareService.getAllFare().subscribe((data: FareData[]) => {
      this.dataSource.data = data;
    })
  }

}
