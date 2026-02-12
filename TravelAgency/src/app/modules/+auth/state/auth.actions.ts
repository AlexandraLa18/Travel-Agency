import { HttpErrorResponse } from "@angular/common/http";
import { AuthenticationRequestDTO } from "src/app/shared/models/authenticationRequestDTO";
import { AuthenticationResponseDTO } from "src/app/shared/models/authenticationResponseDTO";
import { SignupRequestDTO } from "src/app/shared/models/signupRequestDTO";

export namespace AuthActions {
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public readonly authenticationRequest: AuthenticationRequestDTO) {}
  }

  export class LoginSuccess {
    static readonly type = '[Auth] Login Success';
    constructor(public readonly authResponse: AuthenticationResponseDTO) {}
  }

  export class LoginError {
    static readonly type = '[Auth] Login Error';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class SetErrorUndefined {
    static readonly type = '[Auth] Login Error Undefined';
    constructor(){}
  }

  export class Signup {
    static readonly type = '[Auth] Signup';
    constructor(public readonly signupRequest: SignupRequestDTO) {}
  }

  export class SignupSuccess {
    static readonly type = '[Auth] Signup Success';
    constructor(public readonly authResponse: AuthenticationResponseDTO) {}
  }

  export class SignupError {
    static readonly type = '[Auth] Signup Error';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class GoogleLogin {
    static readonly type = '[Auth] GoogleLogin';
    constructor(public readonly authenticationRequest: AuthenticationRequestDTO) {}
  }

  export class GoogleLoginSuccess {
    static readonly type = '[Auth] GoogleLoginSuccess';
    constructor(public readonly authResponse: AuthenticationResponseDTO) {}
  }

  export class GoogleLoginError {
    static readonly type = '[Auth] GoogleLoginError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }
}