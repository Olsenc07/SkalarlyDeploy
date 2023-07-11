import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../app-routing.module';

@Injectable({
  providedIn: AppRoutingModule,
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot

  | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('we getting protection?');
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);
      if (window.location.href !== 'https://www.skalarly.com/login') {
        let snackBarRef = this.snackBar.open(
          'Unathorized to view this content',
          'Create an account to see what your missing',
          {
            duration: 3000,
          }
        );
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['/sign-up']);
        });
      }
    }
    return isAuth;
  }
}
