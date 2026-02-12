import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserDTO } from "../models/userDTO.model";

@Injectable({
    providedIn: 'root'
  })
export class UsersService {
    private apiUrl = environment.apiUrl;

    constructor(private readonly _http: HttpClient) {}

    getUsers(): Observable<UserDTO[]> {
        return this._http.get<UserDTO[]>(`${this.apiUrl}/users/all`);
    }
}