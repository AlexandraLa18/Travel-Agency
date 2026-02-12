import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { FlightState } from './flights.state';
import { FlightsActions } from './flights.actions';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { DestinationDTO } from 'src/app/shared/models/destinationDTO';

@Injectable({
  providedIn: 'root',
})
export class FlightFacade {
  @Select(FlightState.items) readonly flightList$!: Observable<FlightDTO[]>;
  @Select(FlightState.total) readonly total$!: Observable<number>;
  @Select(FlightState.loading) readonly loading$!: Observable<boolean>;
  @Select(FlightState.dataNotFound) readonly dataNotFound$!: Observable<boolean>;
  @Select(FlightState.apiFlights) readonly apiFlights$!: Observable<FlightDTO[]>;
  @Select(FlightState.apiFlightsTotal) readonly apiFlightsTotal$!: Observable<number>;
  @Select(FlightState.apiFlightsLoading) readonly apiFlightsLoading$!: Observable<boolean>;
  @Select(FlightState.apiFlightsDataNotFound) readonly apiFlightsDataNotFound$!: Observable<boolean>;
  @Select(FlightState.flightBookings) readonly flightBookings$!: Observable<FlightDTO[]>;
  @Select(FlightState.selectedFlightBooking) readonly selectedFlightBooking$!: Observable<FlightDTO>;
  @Select(FlightState.flightIsSelected) readonly flightIsSelected$!: Observable<boolean>;
  @Select(FlightState.flightsByCity) readonly flightsByCity$!: Observable<FlightDTO[]>;
  @Select(FlightState.flightsByCityLoading) readonly flightsByCityLoading$!: Observable<boolean>;
  @Select(FlightState.flightsByCityDataNotFound) readonly flightsByCityDataNotFound$!: Observable<boolean>;
  @Select(FlightState.flightBookingsDataNotFound) readonly flightBookingsDataNotFound$!: Observable<boolean>;
 
  constructor(private readonly _store: Store) {}

  loadFlightList() {
    this._store.dispatch(new FlightsActions.LoadFlightsList());
  }

  loadApiFlightsList(fromCityName: string, toCityName: string, departDate: string, returnDate: string, numberOfPassengers: number, cabinClass: string) {
    this._store.dispatch(new FlightsActions.LoadApiFlightsList(fromCityName, toCityName, departDate, returnDate, numberOfPassengers, cabinClass));
  }

  loadFlightsByCityList(cityName: string) {
    this._store.dispatch(new FlightsActions.LoadFlightsByCityList(cityName));
  }

  assignUserToFlight(flight_id: number | undefined, user_id: number | null | undefined){
    this._store.dispatch(new FlightsActions.AssignUserToFlight(flight_id, user_id));
  }

  resetApiFlightBookingsList() {
    this._store.dispatch(new FlightsActions.LoadApiFlightsListError());
  }

  loadFlightListBySearchReq(searchReq: SearchRequestDTO) {
    this._store.dispatch(
      new FlightsActions.LoadFlightsListBySearchReq(searchReq)
    );
  }

  deleteFlightById(id: number | undefined) {
    this._store.dispatch(new FlightsActions.DeleteFlightById(id));
  }

  addFlight(flight: FlightDTO) {
    this._store.dispatch(new FlightsActions.AddFlight(flight));
  }

  createFlightAndAssignUser(flight: FlightDTO, user_id: number | undefined | null) {
    this._store.dispatch(new FlightsActions.CreateFlightAndAssignUser(flight, user_id));
  }

  loadFlightBookingsList(fromdestinationID: number, todestination_id: number, checkin: string, checkout: string, noOfPassengers: number) {
    this._store.dispatch(new FlightsActions.LoadFlightBookingsList(fromdestinationID, todestination_id, checkin, checkout, noOfPassengers));
  }

  resetFlightBookingsList() {
    this._store.dispatch(new FlightsActions.LoadFlightBookingsListError());
  }

  setSelectedFlightBooking(selectedFlightBooking: FlightDTO){
    this._store.dispatch(new FlightsActions.SetSelectedFlightBooking(selectedFlightBooking));
  }

  resetSelectedFlightBooking(){
    this._store.dispatch(new FlightsActions.ResetSelectedFlightBooking());
  }


}
