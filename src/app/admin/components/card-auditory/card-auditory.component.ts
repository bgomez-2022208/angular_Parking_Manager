import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuditData } from '../../services/auditory.service';

@Component({
  selector: 'app-card-auditory',
  templateUrl: './card-auditory.component.html',
  styleUrls: ['./card-auditory.component.scss']
})
export class CardAuditoryComponent {
  displayedColumns: string[] = ['entity', 'startDate', 'action'];
  selectedElement: AuditData | null = null;
  @Input() data: AuditData | null = null;
  @Output() closeCard = new EventEmitter<void>();
  showCard: boolean = true;

  toggleCard(element: AuditData | null) {
    this.closeCard.emit();
    this.data = null;
    this.showCard = false;
  }
}
