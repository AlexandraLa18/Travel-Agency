import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  getAllFlights(): Observable<FlightDTO[]> {
    return this._http.get<FlightDTO[]>(`${this.apiUrl}/flights/all`);
  }

  loadFlightsBySearchReq(searchReq: SearchRequestDTO): Observable<any> {
    return this._http.post<any>(
      `${this.apiUrl}/flights/loadFlightsBySearchReq`,
      searchReq
    );
  }

  deleteFlightById(id: number | undefined): Observable<any> {
    return this._http.delete(`${this.apiUrl}/flights/${id}`);
  }

  requestApiFlights(fromCityName: string, toCityName: string, departDate: string, returnDate: string, numberOfPassengers: number, cabinClass: string): Observable<any> {
    return this._http.get<FlightDTO[]>(`${this.apiUrl}/flights/api/${fromCityName}/${toCityName}/${departDate}/${returnDate}/${numberOfPassengers}/${cabinClass}`);
  }

  requestCityFlights(cityName: string): Observable<any> {
    const params = new HttpParams().set('city', cityName);

    return this._http.get<FlightDTO[]>(`${this.apiUrl}/flights/byCity`,
      { params }
    );
  }

  addFlight(flight: FlightDTO): Observable<FlightDTO> {
    return this._http.post<FlightDTO>(`${this.apiUrl}/flights`, flight);
  }

  createFlightAndAssignUser(flight: FlightDTO, user_id: number |  null | undefined): Observable<FlightDTO> {
    return this._http.post<FlightDTO>(`${this.apiUrl}/flights/${user_id}`, flight);
  }

  searchFlights(fromDestinationId: number, toDestinationId: number, checkin: string, checkout: string, noOfPassengers: number): Observable<any> {
    return this._http.get<FlightDTO[]>(`${this.apiUrl}/flights/getFlightBookings?fromDestinationId=${fromDestinationId}&toDestinationId=${toDestinationId}&departureOrigin=${checkin}&departureDestination=${checkout}&noOfPassengers=${noOfPassengers}`);
  }

  assignUserToFlight(flightId: number | undefined,
    userId: number | null | undefined
  ): Observable<FlightDTO> {
    const url = `${this.apiUrl}/flights/${flightId}/user/${userId}`;
    return this._http.put<FlightDTO>(url, null);
  }
}
