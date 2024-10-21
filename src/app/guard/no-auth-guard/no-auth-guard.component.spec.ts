import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApiUserService } from '../../user/services/user.service';
import { of } from 'rxjs';
import { NoAuthGuard } from './no-auth-guard.component';

// Clase mock para ApiUserService
class MockApiUserService {
  isLoggedIn() {
    return false; // Cambia esto a true para probar la redirección
  }
}

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;
  let router: Router;

  beforeEach(() => {
    const mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        NoAuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: ApiUserService, useClass: MockApiUserService }
      ]
    });

    guard = TestBed.inject(NoAuthGuard);
    router = TestBed.inject(Router);
  });

  it('should allow the route when not logged in', () => {
    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect when logged in', () => {
    spyOn(MockApiUserService.prototype, 'isLoggedIn').and.returnValue(true);
    guard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/admin/register']);
  });
});
