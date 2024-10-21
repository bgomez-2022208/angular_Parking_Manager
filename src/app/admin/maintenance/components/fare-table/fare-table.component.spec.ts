import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FareTableComponent } from './fare-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FareTableComponent', () => {
  let component: FareTableComponent;
  let fixture: ComponentFixture<FareTableComponent>;

  const mockMatDialog = {
    open: jasmine.createSpy('open')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatTableModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      declarations: [FareTableComponent],
      providers: [{ provide: MatDialog, useValue: mockMatDialog }]
    });
    fixture = TestBed.createComponent(FareTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
