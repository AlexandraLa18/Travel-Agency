import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../../../shared/models/userDTO.model';
import { AuthenticationRequestDTO } from 'src/app/shared/models/authenticationRequestDTO';
import { SignupRequestDTO } from 'src/app/shared/models/signupRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  login(credentials: AuthenticationRequestDTO): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/auth/login`, credentials);
  }

  findUserById(userId: number): Observable<UserDTO> {
    return this._http.get<UserDTO>(`${this.apiUrl}/users/${userId}`);
  }

  signup(credentials: SignupRequestDTO): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/auth/signup`, credentials);
  }

  googlelogin(credentials: AuthenticationRequestDTO): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/auth/googlelogin`, credentials);
  }
}