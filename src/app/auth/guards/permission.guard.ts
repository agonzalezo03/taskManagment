import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const permissionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);


  const requiredResource = route.data['resource'];
  const requiredPermissionLevel = route.data['permissionLevel'];

  return authService.checkAuthStatus().pipe(
    switchMap((isAuthenticated) => {
      if (isAuthenticated && authService.authStatus() === AuthStatus.authenticated) {
        const hasPermission = authService.hasPermission(requiredResource, requiredPermissionLevel);
        console.log(hasPermission)

        if (hasPermission) {
          console.log(`Acceso permitido a ${requiredResource}`);
          return [true];
        } else {
          console.log(`Acceso denegado a ${requiredResource}`);
          router.navigateByUrl('/no-permission');
          return [false];
        }
      }
      router.navigateByUrl('/auth');
      return [false];
    })
  );
};
