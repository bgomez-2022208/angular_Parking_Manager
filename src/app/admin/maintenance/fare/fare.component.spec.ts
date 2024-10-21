import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Custom Components
import { FareComponent } from './fare.component';
import { NavbaruserComponent } from '../components/navbaruser/navbaruser.component';
import { FareTableComponent } from '../components/fare-table/fare-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('FareComponent', () => {
  let component: FareComponent;
  let fixture: ComponentFixture<FareComponent>;

  const mockMatDialog = {
    open: jasmine.createSpy('open')
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => {
          return null;
        }
      }
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FareComponent, NavbaruserComponent, FareTableComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        DatePipe,
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
