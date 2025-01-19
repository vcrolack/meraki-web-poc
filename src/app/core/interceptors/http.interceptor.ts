import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenCookieService } from '../auth/services/token-cookie.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenCookieService = inject(TokenCookieService);
  const token = tokenCookieService.getAuthToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
