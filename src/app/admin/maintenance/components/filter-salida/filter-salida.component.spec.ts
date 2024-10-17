import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSalidaComponent } from './filter-salida.component';

describe('FilterSalidaComponent', () => {
  let component: FilterSalidaComponent;
  let fixture: ComponentFixture<FilterSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSalidaComponent]
    });
    fixture = TestBed.createComponent(FilterSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
