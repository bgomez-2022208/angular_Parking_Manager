import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AddUsersComponent } from './add-users.component';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiUserService } from '../../../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Pipe({ name: 'translate' })
export class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

class MockApiUserService {
  getProfilesUser(): () => any {
    return () => of({ message: [{ idProfile: 1 }] });
  }
  getUserById(userId: number) : () => any {
    return () =>  of({ message: { idProfile: { profileId: 1 } } });
  }
  createUser(userData: any) : () => any {
    return () =>  of({ message: { idProfile: { profileId: 1 } } });
  }

  updateUser(userId: number,userData: any) : () => any {
    return () =>  of({ message: { idProfile: { profileId: 1 } } });
  }

  userDeleteStatus(status: boolean, userId: number | undefined, dpi: number, profileId: number) : () => any {
    return () =>  of({ message: { idProfile: { profileId: 1 } } });
  }
}

class MockTranslateService {
  setDefaultLang(lang: string): void {}
  use(lang: string): void {}

  get(key: string | string[], params?: Object): any {
    return of('translated ' + (Array.isArray(key) ? key.join(', ') : key));
  }

  instant(key: string | string[], params?: Object): any {
    return 'translated ' + (Array.isArray(key) ? key.join(', ') : key);
  }
}

describe('AddUsersComponent', () => {
  let component: AddUsersComponent;
  let fixture: ComponentFixture<AddUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        SimpleNotificationsModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [AddUsersComponent, MockTranslatePipe],
      providers: [
        FormBuilder,
        {
          provide: ApiUserService,
          useClass: MockApiUserService
        },
        Router,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ userId: '1' })
          }
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
