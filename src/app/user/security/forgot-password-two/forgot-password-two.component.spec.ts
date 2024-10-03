import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordTwoComponent } from './forgot-password-two.component';

describe('ForgotPasswordTwoComponent', () => {
  let component: ForgotPasswordTwoComponent;
  let fixture: ComponentFixture<ForgotPasswordTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordTwoComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswordTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
