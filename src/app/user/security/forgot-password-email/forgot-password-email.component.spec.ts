import { TestBed } from '@angular/core/testing';
import { ForgotPasswordEmailComponent } from './forgot-password-email.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Si usas matInput, también debes importar este módulo
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ForgotPasswordEmailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordEmailComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        TranslateService
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ForgotPasswordEmailComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
