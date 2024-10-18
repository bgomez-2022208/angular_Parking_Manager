import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { ApiUserService } from '../user/services/user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiUserService: ApiUserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.apiUserService.isLoggedIn()) {
      this.router.navigate(['/auth/login'])
      return false
    }

    const requiredRoles = route.data['roles'] as string[]
    if (requiredRoles && !this.apiUserService.hasRole(requiredRoles)) {
      this.router.navigate(['/admin/forbidden'])
      return false
    }

    return true
  }
}
