import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthFacade } from '../../state/auth.facade';
import { AuthenticationRequestDTO } from 'src/app/shared/models/authenticationRequestDTO';
import { SignupRequestDTO } from 'src/app/shared/models/signupRequestDTO';
import { confirmPasswordValidator } from 'src/app/shared/utils/validators/password.validator';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  readonly error = toSignal(this._authFacade.error$);

  screen: any = 'signin';
  isLoading: boolean = false;
  showPassword1 = false;
  showPassword2 = false;
  showPassword3 = false;

  loginFormData!: FormGroup;
  signupFormData!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this._initFormGroup();
    GoogleAuth.initialize();
  }

  change(event: any): void {
    this.screen = event;
    this._authFacade.setErrorUndefined();
  }

  togglePasswordVisibility1(): void {
    this.showPassword1 = !this.showPassword1;
  }

  togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }
  togglePasswordVisibility3(): void {
    this.showPassword3 = !this.showPassword3;
  }

  login(): void {
    const request: AuthenticationRequestDTO = this.loginFormData.value;
    this._authFacade.login(request);
  }

  register(): void {
    const request: SignupRequestDTO = this.signupFormData.value;
    request.role = 'USER';
    this._authFacade.signup(request);
  }

  async googleClick(): Promise<void> {
    const user = await GoogleAuth.signIn();
    if (user) {
      const googleAccount: AuthenticationRequestDTO = {
        email: user.email,
      };
      this._authFacade.googlelogin(googleAccount);
    }
  }

  private _initFormGroup(): void {
    this.loginFormData = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.signupFormData = this._fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [confirmPasswordValidator('password', 'confirmPassword')],
      }
    );
  }
}
