import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login.component';
import { LanguageService } from '../../services/languaje.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Pipe, PipeTransform } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Pipe({ name: 'translate' })
export class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, MockTranslatePipe],
      imports: [
        HttpClientModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: {
            instant: jasmine.createSpy('instant').and.callFake((key: string) => {
              const translations: { [key: string]: string } = {
                'error.required': 'This field is required.',
                'error.email': 'Invalid email address.',
              };
              return translations[key] || key;
            }),
            get: jasmine.createSpy('get'),
            set: jasmine.createSpy('set'),
            use: jasmine.createSpy('use'),
            setDefaultLang: jasmine.createSpy('setDefaultLang')
          }
        },
        { provide: LanguageService, useClass: LanguageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
