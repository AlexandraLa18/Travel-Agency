import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from './auth.state';
import { Observable } from 'rxjs';
import { AuthenticationRequestDTO } from 'src/app/shared/models/authenticationRequestDTO';
import { AuthActions } from './auth.actions';
import { ApiErrorDTO } from 'src/app/shared/models/apiErrorDTO';
import { SignupRequestDTO } from 'src/app/shared/models/signupRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  @Select(AuthState.error) readonly error$!: Observable<ApiErrorDTO | undefined>;
  @Select(AuthState.isLoggedIn) readonly isLoggedIn$!: Observable<boolean | undefined>;

  constructor(private readonly _store: Store) {}

  login(request: AuthenticationRequestDTO): void {
    this._store.dispatch(new AuthActions.Login(request));
  }

  setErrorUndefined(): void {
    this._store.dispatch(new AuthActions.SetErrorUndefined());
  }

  signup(request: SignupRequestDTO): void {
    this._store.dispatch(new AuthActions.Signup(request));
  }

  googlelogin(request: AuthenticationRequestDTO): void {
    this._store.dispatch(new AuthActions.GoogleLogin(request));
  }

  logout(): void {
    this._store.dispatch(new AuthActions.Logout());
  }
}
