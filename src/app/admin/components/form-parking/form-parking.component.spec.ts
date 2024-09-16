import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParkingComponent } from './form-parking.component';

describe('FormParkingComponent', () => {
  let component: FormParkingComponent;
  let fixture: ComponentFixture<FormParkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormParkingComponent]
    });
    fixture = TestBed.createComponent(FormParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
