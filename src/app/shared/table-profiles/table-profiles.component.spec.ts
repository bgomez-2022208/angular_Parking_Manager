import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProfilesComponent } from './table-profiles.component';

describe('TableProfilesComponent', () => {
  let component: TableProfilesComponent;
  let fixture: ComponentFixture<TableProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableProfilesComponent]
    });
    fixture = TestBed.createComponent(TableProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
