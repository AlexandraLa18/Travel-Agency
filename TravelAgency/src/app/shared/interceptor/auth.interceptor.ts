import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JWT_TOKEN } from 'src/app/core/storage/constants/local-storage.const';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem(JWT_TOKEN);
    if (token && this.isTokenExpired(token)) {
      this._router.navigateByUrl('');
      return EMPTY;
    }
    return next.handle(request);

  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = new Date().getTime() / 1000; // Current time in seconds
    return payload.exp < now;
  }
}
