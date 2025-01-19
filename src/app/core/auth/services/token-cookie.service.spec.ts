import { TestBed } from '@angular/core/testing';

import { TokenCookieService } from './token-cookie.service';

describe('TokenCookieService', () => {
  let service: TokenCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
