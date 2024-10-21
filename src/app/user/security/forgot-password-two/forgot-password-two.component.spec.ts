import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordTwoComponent } from './forgot-password-two.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('ForgotPasswordTwoComponent', () => {
  let component: ForgotPasswordTwoComponent;
  let fixture: ComponentFixture<ForgotPasswordTwoComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => {
          return null;
        }
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordTwoComponent],
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
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Proveedor para ActivatedRoute
      ]
    });
    fixture = TestBed.createComponent(ForgotPasswordTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
