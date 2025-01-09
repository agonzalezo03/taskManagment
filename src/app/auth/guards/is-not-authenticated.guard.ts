import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';


export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  //const url = state.url;
  const router = inject(Router);
  //localStorage.setItem('url', url);

  const authService = inject(AuthService);


  if (authService.authStatus() === AuthStatus.authenticated){
    router.navigateByUrl('/task')
    return false;
  }




  console.log('noauthenticated', route, state)
  return true;
};
