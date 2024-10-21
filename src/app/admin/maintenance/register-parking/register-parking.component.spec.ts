import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterParkingComponent } from './register-parking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ApiUserService } from '../../../user/services/user.service';
import { of } from 'rxjs';
import { NavbaruserComponent } from '../components/navbaruser/navbaruser.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


class MockApiUserService {
  getParkingsRegister() {
    return of([{ name: 'Parking 1', id: 1, status: 'active' }]);
  }
  createParking() {
    return of(null);
  }
}

describe('RegisterParkingComponent', () => {
  let component: RegisterParkingComponent;
  let fixture: ComponentFixture<RegisterParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegisterParkingComponent,
        NavbaruserComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ApiUserService, useClass: MockApiUserService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
