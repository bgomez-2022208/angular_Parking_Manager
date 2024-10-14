import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReporteData } from '../../../services/reporte.service';
import jsPDF from 'jspdf';

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

  toggleCard(reportData: ReporteData | null) {
    this.closeCard.emit();
    this.data = null;
    this.showCard=false;
  }

  convertpdf(): void {
    const doc = new jsPDF();
    const data = this.data;

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

}
