import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { id } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  getUserVacations(user_id: number | null | undefined): Observable<any> {
    return this._http.get<VacationDTO[]>(`${this.apiUrl}/vacations/vacationsListOfUser/${user_id}`);
  }

  getUserFlights(user_id: number | null | undefined): Observable<any> {
    return this._http.get<VacationDTO[]>(`${this.apiUrl}/flights/flightsListOfUser/${user_id}`);
  }

  getUserHotels(user_id: number | null | undefined): Observable<any> {
    return this._http.get<HotelDTO[]>(`${this.apiUrl}/hotels/hotelsListOfUser/${user_id}`);
  }

  getUserSimpleVacations(user_id: number | null | undefined): Observable<any> {
    return this._http.get<VacationDTO[]>(`${this.apiUrl}/simplevacations/simpleVacationsListOfUser/${user_id}`);
  }

  cancelVacation(vacationId: number | null | undefined): Observable<any> {
    return this._http.delete(`${this.apiUrl}/vacations/cancel/${vacationId}`);
  }

  cancelSimpleVacation(vacationId: number | null | undefined): Observable<any> {
    return this._http.delete(`${this.apiUrl}/simplevacations/cancel/${vacationId}`);
  }
  
  cancelHotel(hotelId: number | null | undefined): Observable<any> {
    return this._http.put(`${this.apiUrl}/hotels/cancel/${hotelId}`, null);
  }

  cancelFlight(flight_id: number | null | undefined): Observable<any> {
    return this._http.put(`${this.apiUrl}/flights/cancel/${flight_id}`, null);
  }
}
