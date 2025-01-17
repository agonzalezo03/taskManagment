import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { map } from 'rxjs';


export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  //const url = state.url;
  const router = inject(Router);
  //localStorage.setItem('url', url);

  const authService = inject(AuthService);

  return authService.checkAuthStatus().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated && authService.authStatus() === AuthStatus.authenticated) {
        router.navigateByUrl('/task');
        return false;
      }
      return true;
    })
  );
};
