import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForbiddenComponent } from './forbidden.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate' })
export class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

class TranslateServiceMock {
  get(key: string) {
    return of(key);
  }

  setDefaultLang(lang: string) {
  }

  use(lang: string) {
  }
}

describe('ForbiddenComponent', () => {
  let component: ForbiddenComponent;
  let fixture: ComponentFixture<ForbiddenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [ForbiddenComponent, MockTranslatePipe],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceMock }
      ]
    });

    fixture = TestBed.createComponent(ForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
