import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProfileComponent } from './filter-profile.component';

describe('FilterProfileComponent', () => {
  let component: FilterProfileComponent;
  let fixture: ComponentFixture<FilterProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterProfileComponent]
    });
    fixture = TestBed.createComponent(FilterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
