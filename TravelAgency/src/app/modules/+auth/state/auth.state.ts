import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AuthActions } from './auth.actions';
import { ApiErrorDTO } from 'src/app/shared/models/apiErrorDTO';
import { take } from 'rxjs';
import { CurrentUserActions } from 'src/app/shared/state/current-user/current-user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationResponseDTO } from 'src/app/shared/models/authenticationResponseDTO';
import {
  CURRENT_USER_ID_SESSION_STORAGE,
  CURRENT_USER_ROLE_SESSION_STORAGE,
  JWT_TOKEN,
} from 'src/app/core/storage/constants/local-storage.const';
import { SessionStorageService } from 'src/app/core/storage/services/session-storage.service';

export class AuthStateModel {
  error?: ApiErrorDTO;
  isLoggedIn?: boolean;
}

const initialAuthState = {
  error: undefined,
  isLoggedIn: false,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: initialAuthState,
})
@Injectable()
export class AuthState {
  @Selector()
  static error(state: AuthStateModel): ApiErrorDTO | undefined {
    return state.error;
  }

  @Selector()
  static isLoggedIn(state: AuthStateModel): boolean | undefined {
    return state.isLoggedIn;
  }

  constructor(
    private readonly _sessionStorageService: SessionStorageService,
    private readonly _authenticationController: AuthenticationService,
    private readonly _router: Router
  ) {}

  @Action(AuthActions.Login)
  login(
    { dispatch }: StateContext<AuthStateModel>,
    { authenticationRequest }: AuthActions.Login
  ): void {
    this._authenticationController
      .login(authenticationRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: AuthenticationResponseDTO) =>
          dispatch(new AuthActions.LoginSuccess(response)),
        error: (err: HttpErrorResponse) =>
          dispatch(new AuthActions.LoginError(err)),
      });
  }

  @Action(AuthActions.LoginSuccess)
  loginSuccess(
    { dispatch, patchState }: StateContext<AuthStateModel>,
    { authResponse }: AuthActions.LoginSuccess
  ): void {
    dispatch(
      new CurrentUserActions.InitUser(authResponse.userDTO.id as number)
    );
    patchState({ error: undefined, isLoggedIn: true });
    this._sessionStorageService.setItem(JWT_TOKEN, authResponse.token);

    authResponse.userDTO.role === 'ADMIN'
      ? this._router.navigateByUrl('/admin-tabs')
      : this._router.navigateByUrl('/user-tabs');
  }

  @Action(AuthActions.LoginError)
  loginError(
    { patchState }: StateContext<AuthStateModel>,
    { error }: AuthActions.LoginError
  ): void {
    patchState({ error: error.error, isLoggedIn: false });
  }

  @Action(AuthActions.SetErrorUndefined)
  setErrorUndefined({ patchState }: StateContext<AuthStateModel>): void {
    patchState({ error: undefined });
  }

  @Action(AuthActions.Signup)
  signup(
    { dispatch }: StateContext<AuthStateModel>,
    { signupRequest }: AuthActions.Signup
  ): void {
    this._authenticationController
      .signup(signupRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: AuthenticationResponseDTO) =>
          dispatch(new AuthActions.SignupSuccess(response)),
        error: (err: HttpErrorResponse) =>
          dispatch(new AuthActions.SignupError(err)),
      });
  }

  @Action(AuthActions.SignupSuccess)
  signupSuccess(
    { dispatch, patchState }: StateContext<AuthStateModel>,
    { authResponse }: AuthActions.SignupSuccess
  ): void {
    dispatch(new CurrentUserActions.InitUser(authResponse.userDTO.id as number));
    patchState({ error: undefined, isLoggedIn: true });
    this._sessionStorageService.setItem(JWT_TOKEN, authResponse.token);
    this._router.navigateByUrl('/user-tabs');
  }

  @Action(AuthActions.SignupError)
  signupError(
    { patchState }: StateContext<AuthStateModel>,
    { error }: AuthActions.SignupError
  ): void {
    patchState({ error: error.error, isLoggedIn: false });
  }

  @Action(AuthActions.GoogleLogin)
  googleLogin(
    { dispatch }: StateContext<AuthStateModel>,
    { authenticationRequest }: AuthActions.GoogleLogin
  ): void {
    this._authenticationController
      .googlelogin(authenticationRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: AuthenticationResponseDTO) =>
          dispatch(new AuthActions.GoogleLoginSuccess(response)),
        error: (err: HttpErrorResponse) =>
          dispatch(new AuthActions.GoogleLoginError(err)),
      });
  }

  @Action(AuthActions.GoogleLoginSuccess)
  googleLoginSuccess(
    { dispatch, patchState }: StateContext<AuthStateModel>,
    { authResponse }: AuthActions.GoogleLoginSuccess
  ): void {
    dispatch(new CurrentUserActions.InitUser(authResponse.userDTO.id as number));
    patchState({ error: undefined, isLoggedIn: true });
    this._sessionStorageService.setItem(JWT_TOKEN, authResponse.token);
    this._router.navigateByUrl('/user-tabs');
  }

  @Action(AuthActions.GoogleLoginError)
  googleLoginError(
    { patchState }: StateContext<AuthStateModel>,
    { error }: AuthActions.GoogleLoginError
  ): void {
    patchState({ error: error.error, isLoggedIn: false });
  }

  @Action(AuthActions.Logout)
  logout({ dispatch, patchState }: StateContext<AuthStateModel>): void {
    this._sessionStorageService.removeItem(CURRENT_USER_ID_SESSION_STORAGE);
    this._sessionStorageService.removeItem(CURRENT_USER_ROLE_SESSION_STORAGE);
    this._sessionStorageService.removeItem(JWT_TOKEN);
    patchState({ isLoggedIn: false });
    dispatch(new CurrentUserActions.SetCurrentUser(undefined));
    this._router.navigateByUrl('');
  }
}
