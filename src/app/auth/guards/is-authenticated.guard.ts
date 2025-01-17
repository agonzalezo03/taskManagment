import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { map } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);


  return authService.checkAuthStatus().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated && authService.authStatus() === AuthStatus.authenticated) {
          return true;
        }
        router.navigateByUrl('/auth');
        return true;
      })
    );

};
