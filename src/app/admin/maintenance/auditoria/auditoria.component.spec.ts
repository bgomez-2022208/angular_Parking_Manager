import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuditoriaComponent } from './auditoria.component';
import { AuditoryService } from '../../services/auditory.service';
import { NavbaruserComponent } from '../components/navbaruser/navbaruser.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa MatFormFieldModule
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Importa MatDatepickerModule
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

describe('AuditoriaComponent', () => {
  const mockMatDialog = {
    open: jasmine.createSpy('open') // Mock de la función open
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuditoriaComponent, NavbaruserComponent],
      imports: [
        HttpClientTestingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatToolbarModule,
        TranslateModule.forRoot(),
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule, // Asegúrate de importar este módulo
        MatInputModule,
        MatSelectModule
      ],
      providers: [
        AuditoryService,
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AuditoriaComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
