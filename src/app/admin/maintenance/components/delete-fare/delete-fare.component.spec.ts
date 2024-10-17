import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFareComponent } from './delete-fare.component';

describe('DeleteFareComponent', () => {
  let component: DeleteFareComponent;
  let fixture: ComponentFixture<DeleteFareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFareComponent]
    });
    fixture = TestBed.createComponent(DeleteFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
