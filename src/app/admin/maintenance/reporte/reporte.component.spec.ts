import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Angular Material Modules
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// Custom Components/Services
import { ReporteComponent } from './reporte.component';
import { ReportService } from '../../services/reporte.service';
import { NavbaruserComponent } from '../components/navbaruser/navbaruser.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuditoryService } from '../../services/auditory.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReporteComponent', () => {
  let component: ReporteComponent;
  let fixture: ComponentFixture<ReporteComponent>;

  const mockMatDialog = {
    open: jasmine.createSpy('open'),
  };

  class MockTranslateService {
    instant(key: string): string {
      return key;
    }
    get(key: string) {
      return of(key);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        TranslateModule.forRoot(),
        FormsModule,
        MatTableModule,
        NoopAnimationsModule,
      ],
      declarations: [
        ReporteComponent,
        NavbaruserComponent
      ],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        ReportService,
        AuditoryService
      ]
    });
    fixture = TestBed.createComponent(ReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
