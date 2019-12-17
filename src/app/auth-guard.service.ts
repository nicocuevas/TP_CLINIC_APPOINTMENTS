import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url, route);
  }

  checkLogin(url: string, route): boolean {
    if (this.authService.user && this.authService.profile) {
      const userRole: string = this.authService.profile && this.authService.profile.role;
      const permission: Array<string> = route.data["permission"];
      

      const hasPermission = permission.includes(userRole);
      if (!hasPermission) {
        this.router.navigate(['dashboard']);
      }
      
      return hasPermission; 
    }

    this.router.navigate(['']);
    return false;
  }
}