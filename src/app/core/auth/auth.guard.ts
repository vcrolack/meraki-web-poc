import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateToken().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        if (state.url !== '/auth/login') {
          router.navigate(['/auth/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
        return false;
      }
    }),
    catchError(() => {
      router.navigate([
        '/auth/login',
        { queryParams: { returnUrl: state.url } },
      ]);
      return of(false);
    })
  );
};
