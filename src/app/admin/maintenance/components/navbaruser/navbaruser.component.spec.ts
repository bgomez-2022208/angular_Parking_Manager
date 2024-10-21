import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbaruserComponent } from './navbaruser.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core'; // Importa TranslateModule
import { LanguageService } from 'src/app/user/services/languaje.service';
import { ApiUserService } from 'src/app/user/services/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Simulación de servicios
class MockTranslateService {
  instant(key: string) {
    return key;
  }
}

class MockLanguageService {
  getAvailableLanguages() {
    return ['en', 'es'];
  }
  getCurrentLanguage() {
    return 'en';
  }
  changeLanguage(lang: string) {
    return of(null);
  }
}

class MockApiUserService {
  logout() {
    return of(null);
  }
}

describe('NavbaruserComponent', () => {
  let component: NavbaruserComponent;
  let fixture: ComponentFixture<NavbaruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        TranslateModule.forRoot()
      ],
      declarations: [NavbaruserComponent],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: ApiUserService, useClass: MockApiUserService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbaruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
