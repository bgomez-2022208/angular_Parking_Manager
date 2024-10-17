import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareComponent } from './fare.component';

describe('FareComponent', () => {
  let component: FareComponent;
  let fixture: ComponentFixture<FareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FareComponent]
    });
    fixture = TestBed.createComponent(FareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
