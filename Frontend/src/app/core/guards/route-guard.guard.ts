import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { GlobalConstants } from '../constants/global-constants';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard {

  constructor(
    public authService: AuthService,
    public router: Router,
    private snackbarService: SnackbarService
  ) { }

  canActivate(router: ActivatedRouteSnapshot): boolean {

    this.authService.tryToken();

    if (this.authService.isAuthenticated() && this.authService.isAuthorized(router.data.expectedRole)) {
      return true;
    }
    else if (this.authService.isAuthenticated()) {
      this.authService.defaultRoute();
      this.snackbarService.openSnackBar(GlobalConstants.unauthroized, GlobalConstants.error);
      return false;
    }
    else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
