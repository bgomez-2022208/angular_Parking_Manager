import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { ApiUserService } from '../../services/user.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbaruserComponent } from '../components/navbaruser/navbaruser.component';
import { FilterUserComponent } from '../components/filter-user/filter-user.component';
import { TableUsersComponent } from '../../../shared/table-users/table-users.component';
import { AddUsersComponent } from '../components/add-users/add-users.component';
import { Pipe, PipeTransform } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Pipe({ name: 'translate' })
export class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

class MockApiUserService {
  getUsers() {
    return of({
      users: [],
      totalElements: 0,
      totalPages: 0
    });
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

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        SimpleNotificationsModule.forRoot(),
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatSelectModule,
      ],
      declarations: [
        UsersComponent,
        NavbaruserComponent,
        FilterUserComponent,
        TableUsersComponent,
        AddUsersComponent,
        MockTranslatePipe
      ],
      providers: [
        {
          provide: ApiUserService,
          useClass: MockApiUserService
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({})
          }
        },
        NotificationsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
