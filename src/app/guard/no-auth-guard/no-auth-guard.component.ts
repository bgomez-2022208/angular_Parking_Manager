import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiUserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private apiUserService: ApiUserService, private router: Router) {}

  canActivate(): boolean {
    if (this.apiUserService.isLoggedIn()) {
      this.router.navigate(['/admin/register'])
      return false
    }
    return true
  }
}
