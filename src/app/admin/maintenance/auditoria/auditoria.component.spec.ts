import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuditoriaComponent } from './auditoria.component';
import { AuditData, AuditoryService } from '../../services/auditory.service';
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

  let auditoryService: jasmine.SpyObj<AuditoryService>;

  beforeEach(async () => {
    const auditoryServiceSpy = jasmine.createSpyObj('AuditoryService', [
      'getAuditoryByDateRange'
    ]);

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
        { provide: AuditoryService, useValue: auditoryServiceSpy },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();
    auditoryService = TestBed.inject(
      AuditoryService
    ) as jasmine.SpyObj<AuditoryService>;
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AuditoriaComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should filter audits by date range', () => {
    const fixture = TestBed.createComponent(AuditoriaComponent);
    const component = fixture.componentInstance;

    const mockData = {
      audiths: [
        {
          entity: 'Test Entity',
          startDate: new Date(),
          operation: 'Test Operation',
          result: 'Success'
        }
      ],
      totalElements: 1,
      totalPages: 1
    };

    auditoryService.getAuditoryByDateRange.and.returnValue(of(mockData));

    component.startDate = new Date('2023-01-01');
    component.endDate = new Date('2023-12-31');
    component.applyDateRangeFilter();

    expect(auditoryService.getAuditoryByDateRange).toHaveBeenCalledWith(
      '2022-12-31T18:00:00.000000',
      '2023-12-30T18:00:00.000000',
      component.itemsPerPage,
      component.currentPage
    );

    expect(component.audith.length).toEqual(mockData.audiths.length);
    expect(component.totalElements).toBe(mockData.totalElements);
    expect(component.totalPages).toBe(mockData.totalPages);
  });

  it('should filter audits based on input value', () => {
    const fixture = TestBed.createComponent(AuditoriaComponent);
    const component = fixture.componentInstance;
    component.dataSource.data = [
      {
        auditId: '1',
        entity: 'Test Entity',
        startDate: new Date(),
        operation: 'Test Operation',
        result: 'Success',
        description: 'Test Description',
        request: 'Test Request',
        response: 'Test Response'
      }
    ];

    const inputEvent = { target: { value: 'Test' } } as unknown as HTMLInputElement;
    component.applyFilter({ target: inputEvent } as unknown as Event);

    expect(component.dataSource.filter).toBe('');
  });
});
