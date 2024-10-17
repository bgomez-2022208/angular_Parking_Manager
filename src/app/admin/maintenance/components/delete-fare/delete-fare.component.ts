import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {NotificationsService} from "angular2-notifications";
import { FareService, FareData} from '../../../services/fare.service';


@Component({
  selector: 'app-delete-fare',
  templateUrl: './delete-fare.component.html',
  styleUrls: ['./delete-fare.component.scss']
})
export class DeleteFareComponent {

  constructor(
    private notifications: NotificationsService,

    private apiUserService: FareService,
    private dialogRef: MatDialogRef<DeleteFareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fareId: number },
    private translate: TranslateService
  ) {}

  deleteFare() {

  }

  onNoClick() {

  }
}
