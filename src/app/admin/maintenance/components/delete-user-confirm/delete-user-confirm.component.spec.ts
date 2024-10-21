import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteUserConfirmComponent } from './delete-user-confirm.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Observable, of } from 'rxjs';
import { ApiUserService } from '../../../services/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate' })
export class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

class MockApiUserService {
  deleteUser(userId: number): Observable<any> {
    return of({ success: true });
  }
}

describe('DeleteUserConfirmComponent', () => {
  let component: DeleteUserConfirmComponent;
  let fixture: ComponentFixture<DeleteUserConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUserConfirmComponent, MockTranslatePipe],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { userId: 1 },
        },
        { provide: ApiUserService, useClass: MockApiUserService },
      ],
      imports: [
        TranslateModule.forRoot(),
        SimpleNotificationsModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
