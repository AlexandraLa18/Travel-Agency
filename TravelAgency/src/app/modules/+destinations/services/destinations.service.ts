import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DestinationDTO } from 'src/app/shared/models/destinationDTO';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  getAllDestinations(): Observable<DestinationDTO[]> {
    return this._http.get<DestinationDTO[]>(`${this.apiUrl}/destinations/all`);
  }
  
  loadDestinationsBySearchReq(searchReq: SearchRequestDTO): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/destinations/loadDestinationsBySearchReq`, searchReq);
  }

  deleteDestinationById(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/destinations/${id}`);
  }

  requestApiDestinations(name: string): Observable<any> {
    return this._http.get<DestinationDTO[]>(`${this.apiUrl}/destinations/byName/${name}`)
  }

  addDestination(destination: DestinationDTO): Observable<DestinationDTO> {
    return this._http.post<DestinationDTO>(`${this.apiUrl}/destinations`, destination);
  }

  getRomaniaDestinations(): Observable<DestinationDTO[]> {
    return this._http.get<DestinationDTO[]>(`${this.apiUrl}/destinations/romania`);
  }

  getWorldsPopularDestinations(): Observable<DestinationDTO[]> {
    return this._http.get<DestinationDTO[]>(`${this.apiUrl}/destinations/worldsPopular`);
  }
}
