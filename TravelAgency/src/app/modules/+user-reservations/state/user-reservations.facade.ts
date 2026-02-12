import { Select, Store } from "@ngxs/store";
import { ReservationsState } from "./user-reservations.state";
import { Injectable } from "@angular/core";
import { ReservationsActions } from "./user-reservations.actions";
import { VacationDTO } from "src/app/shared/models/vacationDTO";
import { SimpleVacationDTO } from "src/app/shared/models/simpleVacationDTO";
import { FlightDTO } from "src/app/shared/models/flightDTO";
import { Observable } from "rxjs";
import { HotelDTO } from "src/app/shared/models/hotelDTO";

@Injectable({
  providedIn: 'root',
})
export class ReservationsFacade {
  @Select(ReservationsState.vacations) readonly vacations$!: Observable<VacationDTO[]>;
  @Select(ReservationsState.simpleVacations) readonly simpleVacations$!: Observable<SimpleVacationDTO[]>;
  @Select(ReservationsState.flights) readonly flights$!: Observable<FlightDTO[]>;
  @Select(ReservationsState.hotels) readonly hotels$!: Observable<HotelDTO[]>;

  constructor(private readonly _store: Store) {}

  loadVacations(user_id: number | null | undefined) {
    this._store.dispatch(new ReservationsActions.LoadVacations(user_id));
  }

  loadSimpleVacations(user_id: number | null | undefined){
    this._store.dispatch(new ReservationsActions.LoadSimpleVacation(user_id));
  }

  loadFlights(user_id: number){
    this._store.dispatch(new ReservationsActions.LoadFlights(user_id));
  }

  loadHotels(user_id: number){
    this._store.dispatch(new ReservationsActions.LoadHotels(user_id));
  }

  cancelVacation(vacation_id: number | null | undefined){
    this._store.dispatch(new ReservationsActions.CancelVacation(vacation_id));
  }
  
  cancelSimpleVacation(vacation_id: number | null | undefined){
    this._store.dispatch(new ReservationsActions.CancelSimpleVacation(vacation_id));
  }

  cancelHotels(hotel_id: number | null | undefined){
    this._store.dispatch(new ReservationsActions.CancelHotel(hotel_id));
  }

  cancelFlights(flight_id: number | null | undefined){
    this._store.dispatch(new ReservationsActions.CancelFlights(flight_id));
  }
}
