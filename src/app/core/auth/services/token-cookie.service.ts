import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenCookieService {
  private tokenKey = 'auth-token';

  cookieService = inject(CookieService);

  setToken(token: string) {
    if (!token) return;
    this.cookieService.set(this.tokenKey, token, {
      path: '/',
      domain: 'localhost',
      secure: false,
      sameSite: 'None',
      expires: 7,
    });
  }

  getAuthToken(): string | null {
    return this.cookieService.get(this.tokenKey) ?? null;
  }

  deleteToken() {
    this.cookieService.delete(this.tokenKey);
  }
}
