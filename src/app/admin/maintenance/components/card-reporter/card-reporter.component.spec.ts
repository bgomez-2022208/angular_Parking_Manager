import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReporterComponent } from './card-reporter.component';

describe('CardReporterComponent', () => {
  let component: CardReporterComponent;
  let fixture: ComponentFixture<CardReporterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardReporterComponent]
    });
    fixture = TestBed.createComponent(CardReporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
