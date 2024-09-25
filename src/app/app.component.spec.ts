import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormParkingComponent } from './admin/components/form-parking/form-parking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "./admin/components/navbar/navbar.component";
import { FilterComponent } from "./admin/components/filter/filter.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, NavbarComponent, FilterComponent, BrowserAnimationsModule],
      declarations: [AppComponent, FormParkingComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular_Parking_Manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular_Parking_Manager');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'angular_Parking_Manager app is running!'
    );
  });
  

});
