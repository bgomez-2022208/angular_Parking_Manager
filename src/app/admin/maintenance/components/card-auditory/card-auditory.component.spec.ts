import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAuditoryComponent } from './card-auditory.component';

describe('CardAuditoryComponent', () => {
  let component: CardAuditoryComponent;
  let fixture: ComponentFixture<CardAuditoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAuditoryComponent]
    });
    fixture = TestBed.createComponent(CardAuditoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
