import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { FlightsActions } from './flights.actions';
import { FlightsService } from '../services/flights.service';
import { FlightSearchResponse } from 'src/app/shared/models/flightSearchResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { take } from 'rxjs';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { StateMetadata } from 'src/app/shared/models/state-metadata.model';

export class FlightStateModel {
  itemList!: StateMetadata<FlightDTO>;
  searchRequest!: SearchRequestDTO;
  apiFlights!: StateMetadata<FlightDTO>;
  flightsByCity!: StateMetadata<FlightDTO>;
  flightBookings!: FlightDTO[];
  flightBookingsDataNotFound!: boolean;
  selectedFlightBooking!: FlightDTO;
  flightIsSelected!: boolean;
  currentCity!: string;
}

const initialFlightState = {
  itemList: {
    items: [],
    total: 0,
    loading: false,
    dataNotFound: false,
  },
  searchRequest: {},
  apiFlights: {
    items: [],
    total: 0,
    loading: false,
    dataNotFound: false,
  },
  flightsByCity: {
    items: [],
    total: 0,
    loading: false,
    dataNotFound: false,
  },
  flightBookings: [],
  flightBookingsDataNotFound: false,
  selectedFlightBooking: {},
  flightIsSelected: false,
  currentCity: '',
};

@State<FlightStateModel>({
  name: 'flight',
  defaults: initialFlightState,
})
@Injectable()
export class FlightState {
  @Selector()
  static items(state: FlightStateModel): FlightDTO[] {
    return state.itemList.items;
  }

  @Selector()
  static total(state: FlightStateModel): number {
    return state.itemList.total;
  }

  @Selector()
  static loading(state: FlightStateModel): boolean | undefined {
    return state.itemList.loading;
  }

  @Selector()
  static dataNotFound(state: FlightStateModel): boolean | undefined {
    return state.itemList.dataNotFound;
  }

  @Selector()
  static searchRequest(state: FlightStateModel): SearchRequestDTO {
    return state.searchRequest;
  }

  @Selector()
  static apiFlights(state: FlightStateModel): FlightDTO[] {
    return state.apiFlights.items;
  }

  @Selector()
  static apiFlightsTotal(state: FlightStateModel): number {
    return state.apiFlights.total;
  }

  @Selector()
  static apiFlightsLoading(state: FlightStateModel): boolean | undefined {
    return state.apiFlights.loading;
  }

  @Selector()
  static apiFlightsDataNotFound(state: FlightStateModel): boolean | undefined {
    return state.apiFlights.dataNotFound;
  }

  @Selector()
  static flightBookings(state: FlightStateModel): FlightDTO[] {
    return state.flightBookings;
  }
  
  @Selector()
  static flightBookingsDataNotFound(state: FlightStateModel): boolean {
    return state.flightBookingsDataNotFound;
  }

  @Selector()
  static selectedFlightBooking(state: FlightStateModel): FlightDTO {
    return state.selectedFlightBooking;
  }

  @Selector()
  static flightIsSelected(state: FlightStateModel): boolean {
    return state.flightIsSelected;
  }

  @Selector()
  static flightsByCity(state: FlightStateModel): FlightDTO[] {
    return state.flightsByCity.items;
  }

  @Selector()
  static flightsByCityTotal(state: FlightStateModel): number {
    return state.flightsByCity.total;
  }

  @Selector()
  static flightsByCityLoading(state: FlightStateModel): boolean | undefined {
    return state.flightsByCity.loading;
  }

  @Selector()
  static flightsByCityDataNotFound(
    state: FlightStateModel
  ): boolean | undefined {
    return state.flightsByCity.dataNotFound;
  }

  constructor(private readonly _flightsService: FlightsService) {}

  @Action(FlightsActions.LoadFlightsList)
  LoadFlightsList(ctx: StateContext<FlightStateModel>): void {
    const state = ctx.getState();
    ctx.patchState({
      itemList: {
        ...state.itemList,
        loading: true,
      },
    });
    this._flightsService
      .getAllFlights()
      .pipe(take(1))
      .subscribe({
        next: (response: FlightDTO[]) =>
          ctx.dispatch(new FlightsActions.LoadFlightsListSuccess(response)),
        error: (err: HttpErrorResponse) =>
          ctx.dispatch(new FlightsActions.LoadFlightsListError(err)),
      });
  }

  @Action(FlightsActions.LoadFlightsListSuccess)
  LoadFlightsListSuccess(
    { patchState }: StateContext<FlightStateModel>,
    { response }: FlightsActions.LoadFlightsListSuccess
  ): void {
    const itemList: StateMetadata<FlightDTO> = {
      items: response ?? [],
      total: response.length,
      loading: false,
      dataNotFound: response.length ? false : true,
    };
    patchState({ itemList });
  }

  @Action(FlightsActions.LoadFlightsListError)
  LoadFlightsListError(
    { patchState }: StateContext<FlightStateModel>,
    { error }: FlightsActions.LoadFlightsListError
  ): void {
    const itemList: StateMetadata<FlightDTO> = {
      items: [],
      total: 0,
      loading: false,
      dataNotFound: false,
    };
    patchState({ itemList });
  }

  @Action(FlightsActions.LoadFlightsListBySearchReq)
  LoadFlightsListBySearchReq(
    { dispatch, patchState }: StateContext<FlightStateModel>,
    { searchReq }: FlightsActions.LoadFlightsListBySearchReq
  ): void {
    const searchRequest = {
      ...searchReq,
      sortField: searchReq.sortField ?? 'name',
      sortOrder: 'asc',
    };
    patchState({ searchRequest: searchRequest });
    this._resetMetadata(patchState);

    this._flightsService
      .loadFlightsBySearchReq(searchRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: FlightSearchResponse) =>
          dispatch(
            new FlightsActions.LoadFlightsListBySearchReqSuccess(response)
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(new FlightsActions.LoadFlightssListBySearchReqError(err)),
      });
  }

  @Action(FlightsActions.LoadFlightsListBySearchReqSuccess)
  LoadFlightsListBySearchReqSuccess(
    { patchState }: StateContext<FlightStateModel>,
    { response }: FlightsActions.LoadFlightsListBySearchReqSuccess
  ): void {
    const itemList: StateMetadata<FlightDTO> = {
      items: response.results ?? [],
      total: response.total ?? 0,
    };
    patchState({ itemList });
  }

  @Action(FlightsActions.LoadFlightssListBySearchReqError)
  LoadFlightssListBySearchReqError(
    { patchState }: StateContext<FlightStateModel>,
    { error }: FlightsActions.LoadFlightssListBySearchReqError
  ): void {
    this._resetMetadata(patchState);
  }

  @Action(FlightsActions.AssignUserToFlight)
  AssignUserToFlight(
    { dispatch }: StateContext<FlightStateModel>,
    { flightId, userId }: FlightsActions.AssignUserToFlight
  ): void {
    this._flightsService
      .assignUserToFlight(flightId, userId)
      .pipe(take(1))
      .subscribe({
        next: (response: FlightDTO) =>
          dispatch(new FlightsActions.AssignUserToFlightSuccess(response)),
        error: (err: HttpErrorResponse) =>
          dispatch(new FlightsActions.AssignUserToFlightError(err)),
      });
  }

  @Action(FlightsActions.AssignUserToFlightSuccess)
  AssignUserToFlightSuccess(
    { patchState, dispatch, getState }: StateContext<FlightStateModel>,
    { flight }: FlightsActions.AssignUserToFlightSuccess
  ): void {
    const currentCity = getState().currentCity;
    dispatch(new FlightsActions.LoadFlightsByCityList(currentCity));
  }

  @Action(FlightsActions.AssignUserToFlightError)
  AssignUserToFlightError(
    { patchState }: StateContext<FlightStateModel>,
    { error }: FlightsActions.AssignUserToFlightError
  ): void {}

  @Action(FlightsActions.AddFlight)
  AddFlight(
    { dispatch }: StateContext<FlightStateModel>,
    { flight }: FlightsActions.AddFlight
  ): void {
    this._flightsService
      .addFlight(flight)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new FlightsActions.AddFlightSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new FlightsActions.AddFlightError(err)),
      });
  }

  @Action(FlightsActions.AddFlightSuccess)
  AddFlightSuccess({
    dispatch,
    getState,
  }: StateContext<FlightStateModel>): void {
    const searchReq = getState().searchRequest;
    dispatch(new FlightsActions.LoadFlightsListBySearchReq({ ...searchReq }));
  }

  @Action(FlightsActions.AddFlightError)
  AddFlightError({ error }: FlightsActions.AddFlightError): void {}

  @Action(FlightsActions.CreateFlightAndAssignUser)
  CreateFlightAndAssignUser(
    { dispatch }: StateContext<FlightStateModel>,
    { flight, user_id }: FlightsActions.CreateFlightAndAssignUser
  ): void {
    this._flightsService
      .createFlightAndAssignUser(flight, user_id)
      .pipe(take(1))
      .subscribe({
        next: () =>
          dispatch(new FlightsActions.CreateFlightAndAssignUserSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new FlightsActions.CreateFlightAndAssignUserError(err)),
      });
  }

  @Action(FlightsActions.CreateFlightAndAssignUserSuccess)
  CreateFlightAndAssignUserSuccess({
    dispatch,
    getState,
  }: StateContext<FlightStateModel>): void {}

  @Action(FlightsActions.CreateFlightAndAssignUserError)
  CreateFlightAndAssignUserError({
    error,
  }: FlightsActions.CreateFlightAndAssignUserError): void {}

  @Action(FlightsActions.DeleteFlightById)
  DeleteFlightById(
    { dispatch }: StateContext<FlightStateModel>,
    { id }: FlightsActions.DeleteFlightById
  ): void {
    this._flightsService
      .deleteFlightById(id)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new FlightsActions.DeleteFlightByIdSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new FlightsActions.DeleteFlightByIdError(err)),
      });
  }

  @Action(FlightsActions.DeleteFlightByIdSuccess)
  DeleteFlightByIdSuccess({
    dispatch,
    getState,
  }: StateContext<FlightStateModel>): void {
    const searchReq = getState().searchRequest;
    dispatch(new FlightsActions.LoadFlightsListBySearchReq({ ...searchReq }));
  }

  @Action(FlightsActions.DeleteFlightByIdError)
  DeleteFlightByIdError(
    { patchState }: StateContext<FlightStateModel>,
    { error }: FlightsActions.DeleteFlightByIdError
  ): void {}

  @Action(FlightsActions.LoadApiFlightsList)
  LoadApiFlightsList(
    ctx: StateContext<FlightStateModel>,
    {
      fromCityName,
      toCityName,
      departDate,
      returnDate,
      numberOfPassengers,
      cabinClass,
    }: FlightsActions.LoadApiFlightsList
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      apiFlights: {
        ...state.apiFlights,
        loading: true,
      },
    });
    this._flightsService
      .requestApiFlights(
        fromCityName,
        toCityName,
        departDate,
        returnDate,
        numberOfPassengers,
        cabinClass
      )
      .pipe(take(1))
      .subscribe({
        next: (response: FlightDTO[]) =>
          ctx.dispatch(new FlightsActions.LoadApiFlightsListSuccess(response)),
        error: (err: HttpErrorResponse) =>
          ctx.dispatch(new FlightsActions.LoadApiFlightsListError()),
      });
  }

  @Action(FlightsActions.LoadApiFlightsListSuccess)
  LoadApiFlightsListSuccess(
    { patchState }: StateContext<FlightStateModel>,
    { response }: FlightsActions.LoadApiFlightsListSuccess
  ): void {
    const apiFlights: StateMetadata<FlightDTO> = {
      items: response ?? [],
      total: response.length,
      loading: false,
      dataNotFound: response.length ? false : true,
    };
    patchState({ apiFlights });
  }

  @Action(FlightsActions.LoadApiFlightsListError)
  LoadApiFlightsListError({
    patchState,
  }: StateContext<FlightStateModel>): void {
    const apiFlights: StateMetadata<FlightDTO> = {
      items: [],
      total: 0,
      loading: false,
      dataNotFound: false,
    };
    patchState({ apiFlights });
  }

  @Action(FlightsActions.LoadFlightsByCityList)
  LoadFlightsByCityList(
    ctx: StateContext<FlightStateModel>,
    { cityName }: FlightsActions.LoadFlightsByCityList
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      flightsByCity: { ...state.flightsByCity, loading: true },
    });
    this._flightsService
      .requestCityFlights(cityName)
      .pipe(take(1))
      .subscribe({
        next: (response: FlightDTO[]) =>
          ctx.dispatch(
            new FlightsActions.LoadFlightsByCityListSuccess(response, cityName)
          ),
        error: (err: HttpErrorResponse) =>
          ctx.dispatch(new FlightsActions.LoadFlightsByCityListError()),
      });
  }

  @Action(FlightsActions.LoadFlightsByCityListSuccess)
  LoadFlightsByCityListSuccess(
    { patchState }: StateContext<FlightStateModel>,
    { response, cityName }: FlightsActions.LoadFlightsByCityListSuccess
  ): void {
    const flightsByCity: StateMetadata<FlightDTO> = {
      items: response ?? [],
      total: response.length,
      loading: false,
      dataNotFound: response.length ? false : true,
    };
    patchState({ flightsByCity, currentCity: cityName });
  }

  @Action(FlightsActions.LoadFlightsByCityListError)
  LoadFlightsByCityListError({
    patchState,
  }: StateContext<FlightStateModel>): void {
    const flightsByCity: StateMetadata<FlightDTO> = {
      items: [],
      total: 0,
      loading: false,
      dataNotFound: false,
    };
    patchState({ flightsByCity });
  }

  @Action(FlightsActions.LoadFlightBookingsList)
  LoadFlightBookingsList(
    { dispatch }: StateContext<FlightStateModel>,
    {
      fromDestination_id,
      toDestination_id,
      checkin,
      checkout,
      noOfPassengers,
    }: FlightsActions.LoadFlightBookingsList
  ): void {
    this._flightsService
      .searchFlights(
        fromDestination_id,
        toDestination_id,
        checkin,
        checkout,
        noOfPassengers
      )
      .pipe(take(1))
      .subscribe({
        next: (response: FlightDTO[]) =>
          dispatch(new FlightsActions.LoadFlightBookingsListSuccess(response)),
        error: (err: HttpErrorResponse) =>
          dispatch(new FlightsActions.LoadFlightBookingsListError()),
      });
  }

  @Action(FlightsActions.LoadFlightBookingsListSuccess)
  LoadFlightBookingsListSuccess(
    { patchState }: StateContext<FlightStateModel>,
    { flightBookings }: FlightsActions.LoadFlightBookingsListSuccess
  ): void {
    patchState({ flightBookings, flightBookingsDataNotFound: flightBookings.length > 0 ? false : true });
  }

  @Action(FlightsActions.LoadFlightBookingsListError)
  LoadFlightBookingsListError({
    patchState,
  }: StateContext<FlightStateModel>): void {
    patchState({ flightBookings: [] });
  }

  @Action(FlightsActions.SetSelectedFlightBooking)
  SetSelectedFlightBooking(
    { patchState }: StateContext<FlightStateModel>,
    { selectedFlightBooking }: FlightsActions.SetSelectedFlightBooking
  ): void {
    patchState({ selectedFlightBooking, flightIsSelected: true });
  }

  @Action(FlightsActions.ResetSelectedFlightBooking)
  ResetSelectedFlightBooking({
    patchState,
  }: StateContext<FlightStateModel>): void {
    patchState({ selectedFlightBooking: {}, flightIsSelected: false });
  }

  private _resetMetadata(
    patchState: (val: Partial<FlightStateModel>) => FlightStateModel
  ): void {
    const itemList: StateMetadata<FlightDTO> = {
      items: [],
      total: 0,
    };
    patchState({ itemList });
  }
}
