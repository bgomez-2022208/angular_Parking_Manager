import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard.guard';
import { ApiUserService } from '../user/services/user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let apiUserService: jasmine.SpyObj<ApiUserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    apiUserService = jasmine.createSpyObj('ApiUserService', ['isLoggedIn', 'hasRole']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: ApiUserService, useValue: apiUserService },
        { provide: Router, useValue: router }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to login if not logged in', () => {
    apiUserService.isLoggedIn.and.returnValue(false);

    const route: ActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: '',
      data: {},
      outlet: '',
      component: null,
      routeConfig: null,
      root: {} as any,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
      title: '',
      paramMap: {} as any,
      queryParamMap: {} as any,
    } as ActivatedRouteSnapshot;

    const result = guard.canActivate(route, {} as RouterStateSnapshot);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should navigate to forbidden if user lacks roles', () => {
    apiUserService.isLoggedIn.and.returnValue(true);
    apiUserService.hasRole.and.returnValue(false);

    const route: ActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: '',
      data: { roles: ['admin'] },
      outlet: '',
      component: null,
      routeConfig: null,
      root: {} as any,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
      title: '',
      paramMap: {} as any,
      queryParamMap: {} as any,
    } as ActivatedRouteSnapshot;

    const result = guard.canActivate(route, {} as RouterStateSnapshot);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/admin/forbidden']);
  });

  it('should return true if user is logged in and has roles', () => {
    apiUserService.isLoggedIn.and.returnValue(true);
    apiUserService.hasRole.and.returnValue(true);

    const route: ActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: '',
      data: { roles: ['admin'] },
      outlet: '',
      component: null,
      routeConfig: null,
      root: {} as any,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
      title: '',
      paramMap: {} as any,
      queryParamMap: {} as any,
    } as ActivatedRouteSnapshot;

    const result = guard.canActivate(route, {} as RouterStateSnapshot);

    expect(result).toBeTrue();
  });
});
