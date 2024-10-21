import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterSalidaComponent } from './filter-salida.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiUserService } from '../../../services/user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importar el módulo de prueba de HttpClient


@Pipe({ name: 'translate' })
export class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}
// Mock del servicio ApiUserService
class ApiUserServiceMock {
  salidaParking(data: any) {
    return of({}); // Simula una respuesta exitosa
  }
}

// Mock del TranslateService
class TranslateServiceMock {
  get(key: string) {
    return of(key); // Devuelve la clave como valor de traducción en un observable
  }

  instant(key: string) {
    return key; // Devuelve la clave como valor de traducción
  }
}

describe('FilterSalidaComponent', () => {
  let component: FilterSalidaComponent;
  let fixture: ComponentFixture<FilterSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [FilterSalidaComponent, MockTranslatePipe],
      providers: [
        { provide: ApiUserService, useClass: ApiUserServiceMock },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: TranslateService, useClass: TranslateServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
