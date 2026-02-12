import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { SimpleVacationDTO } from 'src/app/shared/models/simpleVacationDTO';
import { SimpleVacationRequest } from 'src/app/shared/models/simpleVacationRequest';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';
import { VacationRequest } from 'src/app/shared/models/vacationRequest';
import { VacationSearchReq } from 'src/app/shared/models/vacationSearchReq';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacationsService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  loadVacationsBySearchReq(searchReq: SearchRequestDTO): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/vacations/loadVacationsBySearchReq`, searchReq);
  }

  deleteVacationById(id: number | undefined | null): Observable<any> {
    return this._http.delete(`${this.apiUrl}/vacations/${id}`);
  }

  addVacation(vacation: VacationDTO) {
    return this._http.post<any>(`${this.apiUrl}/vacations`, vacation);
  }

  createVacationByUser(vacationReq: VacationRequest) {
    return this._http.post<any>(`${this.apiUrl}/vacations/byUser`, vacationReq);
  }

  searchHotels(destinationId: number, checkin: string, checkout: string, noOfPassengers: number): Observable<any> {
    return this._http.get<HotelDTO[]>(`${this.apiUrl}/hotels/getHotelsByDestinationAndDates?destinationId=${destinationId}&checkin=${checkin}&checkout=${checkout}&noOfPassengers=${noOfPassengers}`);
  }


  getVacationsByCity(cityName: string): Observable<VacationDTO[]> {
    const params = new HttpParams().set('city', cityName);

    return this._http.get<SimpleVacationDTO[]>(
      `${this.apiUrl}/vacations/byCity`,
      { params }
    );
  }

  getVacationsByCityPeriodAdults(
    vacationSearchReq: VacationSearchReq
  ) {
    let params = new HttpParams();

    if (vacationSearchReq.from) {
      params = params.set('from', vacationSearchReq.from);
    }
    if (vacationSearchReq.to) {
      params = params.set('to', vacationSearchReq.to);
    }
    if (vacationSearchReq.checkin) {
      params = params.set('checkin', vacationSearchReq.checkin);
    }
    if (vacationSearchReq.checkout) {
      params = params.set('checkout', vacationSearchReq.checkout);
    }
    if (vacationSearchReq.adults !== undefined) {
      params = params.set(
        'noOfPassengers',
        vacationSearchReq.adults.toString()
      );
    }
    return this._http.get<SimpleVacationDTO[]>(
      `${this.apiUrl}/vacations/findByCityAndCheckinAndCheckoutAndNoOfPassengers`,
      { params }
    );
  }

  assignUserToVacation(
    vacationId: number | null | undefined,
    userId: number | null | undefined
  ): Observable<VacationDTO> {
    const url = `${this.apiUrl}/vacations/${vacationId}/user/${userId}`;
    return this._http.put<VacationDTO>(url, null);
  }
}
