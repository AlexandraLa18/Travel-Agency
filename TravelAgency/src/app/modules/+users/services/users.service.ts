import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  loadUsersBySearchReq(searchReq: SearchRequestDTO): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/users/loadUsersBySearchReq`, searchReq);
  }

  deleteUserById(id: number | undefined | null): Observable<any> {
    return this._http.delete(`${this.apiUrl}/users/${id}`);
  }

  addUser(user: UserDTO) {
    return this._http.post<any>(`${this.apiUrl}/users`, user);
  }
}
