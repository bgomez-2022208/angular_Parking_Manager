import { TestBed } from '@angular/core/testing';
import { AuditoriaComponent } from './auditoria.component';

describe('AuditoriaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriaComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AuditoriaComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});