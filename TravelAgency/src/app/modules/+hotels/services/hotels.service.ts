import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  getAllHotels(): Observable<HotelDTO[]> {
    return this._http.get<HotelDTO[]>(`${this.apiUrl}/hotels/all`);
  }

  loadHotelsBySearchReq(searchReq: SearchRequestDTO): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/hotels/loadHotelsBySearchReq`, searchReq);
  }

  deleteHotelById(id: number | undefined): Observable<any> {
    return this._http.delete(`${this.apiUrl}/hotels/${id}`);
  }

  requestApiHotels( destinationEntityID: string, checkin: string, checkout: string, rooms: number, adults: number, resultsPErPAge: number, page: number) {
    return this._http.get<HotelDTO[]>(`${this.apiUrl}/hotels/api/${destinationEntityID}/${checkin}/${checkout}/${rooms}/${adults}/${resultsPErPAge}/${page}`);
  }

  requestApiHotelsByDestinationCity(destinationCity: string, checkin: string | undefined, checkout: string | undefined, rooms: number, adults: number | undefined, resultsPErPAge: number, page: number) {
    return this._http.get<HotelDTO[]>(`${this.apiUrl}/hotels/api/city/${destinationCity}/${checkin}/${checkout}/${rooms}/${adults}/${resultsPErPAge}/${page}`);
  }

  createApiHotel(hotel: HotelDTO, destinationEntityId: string) {
    return this._http.post<any>(`${this.apiUrl}/hotels/addApiHotel/${destinationEntityId}`, hotel);
  }

  searchHotels(destinationId: number, checkin: string, checkout: string, noOfPassengers: number): Observable<any> {
    return this._http.get<HotelDTO[]>(`${this.apiUrl}/hotels/getHotelsByDestinationAndDates?destinationId=${destinationId}&checkin=${checkin}&checkout=${checkout}&noOfPassengers=${noOfPassengers}`);
  }

  createHotelAndAssignUser(hotel: HotelDTO, user_id: number |  null | undefined): Observable<HotelDTO> {
    return this._http.post<HotelDTO>(`${this.apiUrl}/hotels/${user_id}`, hotel);
  }
}
