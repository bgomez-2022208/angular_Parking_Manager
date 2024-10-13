import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReporteData } from '../../../services/reporte.service';

@Component({
  selector: 'app-card-reporter',
  templateUrl: './card-reporter.component.html',
  styleUrls: ['./card-reporter.component.scss']
})
export class CardReporterComponent {
  selectedElement: ReporteData | null = null;
  @Input() data: ReporteData | null = null;
  @Output() closeCard = new EventEmitter<void>();
  showCard: boolean = true;

  toggleCard(element: ReporteData | null) {
    this.closeCard.emit();
    this.data = null;
    this.showCard=false;
  }
}
