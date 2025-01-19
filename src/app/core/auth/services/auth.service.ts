import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { SuccessResponse } from '../../interfaces/success-response.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { LoginRequest } from '../interfaces/login-request.interface';
import { TokenCookieService } from './token-cookie.service';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  tokenCookieService = inject(TokenCookieService);
  router = inject(Router);
  user = signal(null);

  login(credentials: LoginRequest) {
    return this.http.post<SuccessResponse<LoginResponse>>(
      `${environment.apiUrl}/auth/login`,
      credentials
    );
  }

  logout() {
    this.tokenCookieService.deleteToken();
    this.router.navigate(['/auth/login']);
  }

  validateToken() {
    const token = this.tokenCookieService.getAuthToken();
    if (!token) return of(false);

    return this.http
      .post<SuccessResponse<boolean>>(
        `${environment.apiUrl}/auth/validate-token`,
        { token }
      )
      .pipe(
        map((response) => true),
        catchError(() => of(false))
      );
  }
}
