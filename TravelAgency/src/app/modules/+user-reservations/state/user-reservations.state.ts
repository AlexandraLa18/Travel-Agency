import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ReservationsService } from '../services/reservations.service';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';
import { StateMetadata } from 'src/app/shared/models/state-metadata.model';
import { SimpleVacationDTO } from 'src/app/shared/models/simpleVacationDTO';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { ReservationsActions } from './user-reservations.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';

export class ReservationsStateModel {
  vacations!: StateMetadata<VacationDTO>;
  simpleVacations!: StateMetadata<SimpleVacationDTO>;
  flights!: StateMetadata<FlightDTO>;
  hotels!: StateMetadata<HotelDTO>;
  currentUserId!: number | null | undefined;
}

const initialReservationsState = {
  vacations: {
    items: [],
    total: 0,
  },
  simpleVacations: {
    items: [],
    total: 0,
  },
  flights: {
    items: [],
    total: 0,
  },
  hotels: {
    items: [],
    total: 0
  },
  currentUserId: null
};

@State<ReservationsStateModel>({
  name: 'reservations',
  defaults: initialReservationsState,
})
@Injectable()
export class ReservationsState {
  @Selector()
  static vacations(state: ReservationsStateModel): VacationDTO[] {
    return state.vacations.items;
  }

  @Selector()
  static simpleVacations(state: ReservationsStateModel): SimpleVacationDTO[] {
    return state.simpleVacations.items;
  }

  @Selector()
  static flights(state: ReservationsStateModel): FlightDTO[] {
    return state.flights.items;
  }

  @Selector()
  static hotels(state: ReservationsStateModel): FlightDTO[] {
    return state.hotels.items;
  }

  constructor(private readonly _reservationsService: ReservationsService) {}

  @Action(ReservationsActions.LoadVacations)
  LoadVacations({ dispatch }: StateContext<ReservationsStateModel>,
    { user_id }: ReservationsActions.LoadVacations
    ): void {
    this._reservationsService
      .getUserVacations(user_id)
      .pipe(take(1))
      .subscribe({
        next: (response: VacationDTO[]) =>
          dispatch(new ReservationsActions.LoadVacationsSuccess(response, user_id)),
        error: (err: HttpErrorResponse) =>
          dispatch(new ReservationsActions.LoadVacationsError(err)),
      });
  }

  @Action(ReservationsActions.LoadVacationsSuccess)
  LoadVacationsSuccess(
    { patchState }: StateContext<ReservationsStateModel>,
    { response, user_id }: ReservationsActions.LoadVacationsSuccess
  ): void {
    const vacations: StateMetadata<VacationDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ vacations, currentUserId: user_id });
  }

  @Action(ReservationsActions.LoadVacationsError)
  LoadVacationsError(
    { patchState }: StateContext<ReservationsStateModel>,
    { error }: ReservationsActions.LoadVacationsError
  ): void {
    const vacations: StateMetadata<VacationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ vacations });
  }

  @Action(ReservationsActions.CancelSimpleVacation)
  CancelSimpleVacation({ dispatch }: StateContext<ReservationsStateModel>,
    { vacation_id }: ReservationsActions.CancelSimpleVacation
    ): void {
    this._reservationsService
      .cancelSimpleVacation(vacation_id)
      .pipe(take(1))
      .subscribe({
        next: () =>
          dispatch(new ReservationsActions.CancelSimpleVacationSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new ReservationsActions.CancelSimpleVacationError()),
      });
  }

  @Action(ReservationsActions.CancelSimpleVacationSuccess)
  CancelSimpleVacationSuccess(
    { dispatch, getState }: StateContext<ReservationsStateModel>,
  ): void {
    const user_id = getState().currentUserId;
    dispatch(new ReservationsActions.LoadSimpleVacation(user_id));
  }

  @Action(ReservationsActions.CancelSimpleVacationError)
  CancelSimpleVacationError(
    { patchState }: StateContext<ReservationsStateModel>
  ): void {}

  @Action(ReservationsActions.CancelVacation)
  CancelVacation({ dispatch }: StateContext<ReservationsStateModel>,
    { vacation_id }: ReservationsActions.CancelVacation
    ): void {
    this._reservationsService
      .cancelVacation(vacation_id)
      .pipe(take(1))
      .subscribe({
        next: () =>
          dispatch(new ReservationsActions.CancelVacationSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new ReservationsActions.CancelVacationError()),
      });
  }

  @Action(ReservationsActions.CancelVacationSuccess)
  CancelVacationSuccess(
    { dispatch, getState }: StateContext<ReservationsStateModel>,
  ): void {
    const user_id = getState().currentUserId;

    dispatch(new ReservationsActions.LoadVacations(user_id));
  }

  @Action(ReservationsActions.CancelVacationError)
  CancelVacationError(
    { patchState }: StateContext<ReservationsStateModel>
  ): void {
  }

  @Action(ReservationsActions.LoadFlights)
  LoadFlights({ dispatch }: StateContext<ReservationsStateModel>,
    { user_id }: ReservationsActions.LoadFlights
    ): void {
    this._reservationsService
      .getUserFlights(user_id)
      .pipe(take(1))
      .subscribe({
        next: (response: FlightDTO[]) =>
          dispatch(new ReservationsActions.LoadFlightsSuccess(response, user_id)),
        error: (err: HttpErrorResponse) =>
          dispatch(new ReservationsActions.LoadFlightsError(err)),
      });
  }

  @Action(ReservationsActions.LoadFlightsSuccess)
  LoadFlightsSuccess(
    { patchState }: StateContext<ReservationsStateModel>,
    { response, user_id }: ReservationsActions.LoadFlightsSuccess
  ): void {
    const flights: StateMetadata<FlightDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ flights, currentUserId: user_id });
  }

  @Action(ReservationsActions.LoadFlightsError)
  LoadFlightsError(
    { patchState }: StateContext<ReservationsStateModel>,
    { error }: ReservationsActions.LoadFlightsError
  ): void {
    const flights: StateMetadata<FlightDTO> = {
      items: [],
      total: 0,
    };
    patchState({ flights });
  }
  
  @Action(ReservationsActions.CancelFlights)
  CancelFlights({ dispatch }: StateContext<ReservationsStateModel>,
    { flight_id }: ReservationsActions.CancelFlights
    ): void {
    this._reservationsService
      .cancelFlight(flight_id)
      .pipe(take(1))
      .subscribe({
        next: () =>
          dispatch(new ReservationsActions.CancelFlightsSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new ReservationsActions.CancelFlightsError()),
      });
  }

  @Action(ReservationsActions.CancelFlightsSuccess)
  CancelFlightsSuccess(
    { dispatch, getState }: StateContext<ReservationsStateModel>,
  ): void {
    const user_id = getState().currentUserId;

    dispatch(new ReservationsActions.LoadFlights(user_id));
  }

  
  @Action(ReservationsActions.CancelFlightsError)
  CancelFlightsError(
    { patchState }: StateContext<ReservationsStateModel>
  ): void {
  }

  @Action(ReservationsActions.LoadHotels)
  LoadHotels({ dispatch }: StateContext<ReservationsStateModel>,
    { user_id }: ReservationsActions.LoadHotels
    ): void {
    this._reservationsService
      .getUserHotels(user_id)
      .pipe(take(1))
      .subscribe({
        next: (response: HotelDTO[]) =>
          dispatch(new ReservationsActions.LoadHotelsSuccess(response, user_id)),
        error: (err: HttpErrorResponse) =>
          dispatch(new ReservationsActions.LoadHotelsError(err)),
      });
  }

  @Action(ReservationsActions.LoadHotelsSuccess)
  LoadHotelsSuccess(
    { patchState }: StateContext<ReservationsStateModel>,
    { response, user_id }: ReservationsActions.LoadHotelsSuccess
  ): void {
    const hotels: StateMetadata<FlightDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ hotels, currentUserId: user_id });
  }

  @Action(ReservationsActions.LoadHotelsError)
  LoadHotelsError(
    { patchState }: StateContext<ReservationsStateModel>,
    { error }: ReservationsActions.LoadHotelsError
  ): void {
    const hotels: StateMetadata<FlightDTO> = {
      items: [],
      total: 0,
    };
    patchState({ hotels });
  }

  @Action(ReservationsActions.CancelHotel)
  CancelHotel({ dispatch }: StateContext<ReservationsStateModel>,
    { hotel_id }: ReservationsActions.CancelHotel
    ): void {
    this._reservationsService
      .cancelHotel(hotel_id)
      .pipe(take(1))
      .subscribe({
        next: () =>
          dispatch(new ReservationsActions.CancelHotelSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new ReservationsActions.CancelHotelError()),
      });
  }

  @Action(ReservationsActions.CancelHotelSuccess)
  CancelHotelSuccess(
    { dispatch, getState }: StateContext<ReservationsStateModel>,
  ): void {
    const user_id = getState().currentUserId;

    dispatch(new ReservationsActions.LoadHotels(user_id));
  }

  @Action(ReservationsActions.CancelHotelError)
  CancelHotelError(
    { patchState }: StateContext<ReservationsStateModel>
  ): void {
  }

  @Action(ReservationsActions.LoadSimpleVacation)
  LoadSimpleVacation({ dispatch }: StateContext<ReservationsStateModel>,
    { user_id }: ReservationsActions.LoadSimpleVacation
    ): void {
      console.log(user_id);
    this._reservationsService
      .getUserSimpleVacations(user_id)
      .pipe(take(1))
      .subscribe({
        next: (response: SimpleVacationDTO[]) =>
          dispatch(new ReservationsActions.LoadSimpleVacationSuccess(response, user_id)),
        error: (err: HttpErrorResponse) =>
          dispatch(new ReservationsActions.LoadSimpleVacationError(err)),
      });
  }

  @Action(ReservationsActions.LoadSimpleVacationSuccess)
  LoadSimpleVacationSuccess(
    { patchState }: StateContext<ReservationsStateModel>,
    { response, user_id }: ReservationsActions.LoadSimpleVacationSuccess
  ): void {
    const simpleVacations: StateMetadata<VacationDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ simpleVacations, currentUserId: user_id });
  }

  @Action(ReservationsActions.LoadSimpleVacationError)
  LoadSimpleVacationError(
    { patchState }: StateContext<ReservationsStateModel>,
    { error }: ReservationsActions.LoadSimpleVacationError
  ): void {
    const simpleVacations: StateMetadata<SimpleVacationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ simpleVacations });
  }
}
