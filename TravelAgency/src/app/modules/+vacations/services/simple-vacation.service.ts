import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { SimpleVacationDTO } from 'src/app/shared/models/simpleVacationDTO';
import { SimpleVacationSearchReq } from 'src/app/shared/models/simpleVacationSearchReq';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SimpleVacationService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  loadVacationsBySearchReq(searchReq: SearchRequestDTO): Observable<any> {
    return this._http.post<any>(
      `${this.apiUrl}/simplevacations/loadSimpleVacationsBySearchReq`,
      searchReq
    );
  }

  deleteVacationById(id: number | undefined | null): Observable<any> {
    return this._http.delete(`${this.apiUrl}/simplevacations/${id}`);
  }

  addVacation(vacation: SimpleVacationDTO) {
    return this._http.post<any>(`${this.apiUrl}/simplevacations`, vacation);
  }

  getVacationsByCity(cityName: string): Observable<SimpleVacationDTO[]> {
    const params = new HttpParams().set('city', cityName);

    return this._http.get<SimpleVacationDTO[]>(
      `${this.apiUrl}/simplevacations/byCity`,
      { params }
    );
  }

  getAllSimpleVacations(): Observable<SimpleVacationDTO[]> {
    return this._http.get<SimpleVacationDTO[]>(
      `${this.apiUrl}/simplevacations/all`
    );
  }

  assignUserToSimpleVacation(
    simpleVacationId: number | null | undefined,
    userId: number | null | undefined
  ): Observable<SimpleVacationDTO> {
    const url = `${this.apiUrl}/simplevacations/${simpleVacationId}/user/${userId}`;
    return this._http.put<SimpleVacationDTO>(url, null);
  }

  getVacationsByCityPeriodAdults(
    simpleVacationSearchReq: SimpleVacationSearchReq
  ) {
    let params = new HttpParams();

    if (simpleVacationSearchReq.cityName) {
      params = params.set('city', simpleVacationSearchReq.cityName);
    }
    if (simpleVacationSearchReq.checkin) {
      params = params.set('checkin', simpleVacationSearchReq.checkin);
    }
    if (simpleVacationSearchReq.checkout) {
      params = params.set('checkout', simpleVacationSearchReq.checkout);
    }
    if (simpleVacationSearchReq.adults !== undefined) {
      params = params.set(
        'noOfPassengers',
        simpleVacationSearchReq.adults.toString()
      );
    }
    return this._http.get<SimpleVacationDTO[]>(
      `${this.apiUrl}/simplevacations/findByCityAndCheckinAndCheckoutAndNoOfPassengers`,
      { params }
    );
  }
}
