import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, State, Selector, StateContext } from '@ngxs/store';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { HotelsService } from '../services/hotels.service';
import { HotelActions } from './hotel.actions';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { StateMetadata } from 'src/app/shared/models/state-metadata.model';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { HotelSearchResponse } from 'src/app/shared/models/hotelSearchResponse';

export class HotelStateModel {
  itemList!: StateMetadata<HotelDTO>;
  searchRequest!: SearchRequestDTO;
  apiHotels!: StateMetadata<HotelDTO>;
  hotelBookings!: HotelDTO[];
  selectedHotelBooking!: HotelDTO;
  hotelIsSelected!: boolean;
}

const initialHotelState = {
  itemList: {
    items: [],
    total: 0,
  },
  searchRequest: {},
  apiHotels: {
    items: [],
    total: 0,
    loading: false,
    dataNotFound: false,
  },
  hotelBookings: [],
  selectedHotelBooking: {},
  hotelIsSelected: false,
};

@State<HotelStateModel>({
  name: 'hotels',
  defaults: initialHotelState,
})
@Injectable()
export class HotelState {
  @Selector()
  static items(state: HotelStateModel): HotelDTO[] {
    return state.itemList.items;
  }

  @Selector()
  static total(state: HotelStateModel): number {
    return state.itemList.total;
  }

  @Selector()
  static searchRequest(state: HotelStateModel): SearchRequestDTO {
    return state.searchRequest;
  }

  @Selector()
  static apiHotels(state: HotelStateModel): HotelDTO[] {
    return state.apiHotels.items;
  }

  @Selector()
  static apiHotelsTotal(state: HotelStateModel): number {
    return state.apiHotels.total;
  }

  @Selector()
  static apiHotelsLoading(state: HotelStateModel): boolean | undefined {
    return state.apiHotels.loading;
  }

  @Selector()
  static apiHotelsDataNotFound(state: HotelStateModel): boolean | undefined {
    return state.apiHotels.dataNotFound;
  }

  @Selector()
  static hotelBookings(state: HotelStateModel): HotelDTO[] {
    return state.hotelBookings;
  }

  @Selector()
  static selectedHotelBooking(state: HotelStateModel): HotelDTO {
    return state.selectedHotelBooking;
  }
  @Selector()
  static hotelIsSelected(state: HotelStateModel): boolean {
    return state.hotelIsSelected;
  }

  constructor(private readonly _hotelService: HotelsService) {}

  @Action(HotelActions.LoadHotelList)
  loadHotelList({ dispatch }: StateContext<HotelStateModel>): void {
    this._hotelService
      .getAllHotels()
      .pipe(take(1))
      .subscribe({
        next: (response: HotelDTO[]) =>
          dispatch(new HotelActions.LoadHotelListSuccess(response)),
        error: (err: HttpErrorResponse) =>
          dispatch(new HotelActions.LoadHotelListError(err)),
      });
  }

  @Action(HotelActions.LoadHotelListSuccess)
  loadHotelListSuccess(
    { patchState }: StateContext<HotelStateModel>,
    { response }: HotelActions.LoadHotelListSuccess
  ): void {
    const itemList: StateMetadata<HotelDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ itemList });
  }

  @Action(HotelActions.LoadHotelListError)
  loadHotelListError(
    { patchState }: StateContext<HotelStateModel>,
    { error }: HotelActions.LoadHotelListError
  ): void {
    const itemList: StateMetadata<HotelDTO> = {
      items: [],
      total: 0,
    };
    patchState({ itemList });
  }

  @Action(HotelActions.LoadApiHotelList)
  LoadApiHotelList(
    ctx: StateContext<HotelStateModel>,
    {
      destinationEntityID,
      checkin,
      checkout,
      rooms,
      adults,
      resultsPErPAge,
      page,
    }: HotelActions.LoadApiHotelList
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      apiHotels: {
        ...state.apiHotels,
        loading: true,
      },
    });
    this._hotelService
      .requestApiHotels(
        destinationEntityID,
        checkin,
        checkout,
        rooms,
        adults,
        resultsPErPAge,
        page
      )
      .pipe(take(1))
      .subscribe({
        next: (response: HotelDTO[]) =>
          ctx.dispatch(new HotelActions.LoadApiHotelListSuccess(response)),
        error: (err: HttpErrorResponse) =>
          ctx.dispatch(new HotelActions.LoadApiHotelListError()),
      });
  }

  @Action(HotelActions.LoadApiHotelListSuccess)
  LoadApiHotelListSuccess(
    { patchState }: StateContext<HotelStateModel>,
    { response }: HotelActions.LoadApiHotelListSuccess
  ): void {
    const apiHotels: StateMetadata<HotelDTO> = {
      items: response ?? [],
      total: response.length,
      loading: false,
      dataNotFound: response.length ? false : true,
    };
    patchState({ apiHotels });
  }

  @Action(HotelActions.LoadApiHotelListError)
  LoadApiHotelListError({ patchState }: StateContext<HotelStateModel>): void {
    const apiHotels: StateMetadata<HotelDTO> = {
      items: [],
      total: 0,
      loading: false,
      dataNotFound: false,
    };
    patchState({ apiHotels });
  }

  @Action(HotelActions.LoadApiHotelsListByDestinationCity)
  LoadApiHotelsListByDestinationCity(
    ctx: StateContext<HotelStateModel>,
    {
      destinationCity,
      checkin,
      checkout,
      rooms,
      adults,
      resultsPErPAge,
      page,
    }: HotelActions.LoadApiHotelsListByDestinationCity
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      apiHotels: {
        ...state.apiHotels,
        loading: true,
      },
    });
    this._hotelService
      .requestApiHotelsByDestinationCity(
        destinationCity,
        checkin,
        checkout,
        rooms,
        adults,
        resultsPErPAge,
        page
      )
      .pipe(take(1))
      .subscribe({
        next: (response: HotelDTO[]) =>
          ctx.dispatch(
            new HotelActions.LoadApiHotelsListByDestinationCitySuccess(response)
          ),
        error: (err: HttpErrorResponse) =>
          ctx.dispatch(
            new HotelActions.LoadApiHotelsListByDestinationCityError()
          ),
      });
  }

  @Action(HotelActions.LoadApiHotelsListByDestinationCitySuccess)
  LoadApiHotelsListByDestinationCitySuccess(
    { patchState }: StateContext<HotelStateModel>,
    { response }: HotelActions.LoadApiHotelsListByDestinationCitySuccess
  ): void {
    const apiHotels: StateMetadata<HotelDTO> = {
      items: response ?? [],
      total: response.length,
      loading: false,
      dataNotFound: response.length ? false : true,
    };
    patchState({ apiHotels });
  }

  @Action(HotelActions.LoadApiHotelsListByDestinationCityError)
  LoadApiHotelsListByDestinationCityError({
    patchState,
  }: StateContext<HotelStateModel>): void {
    const apiHotels: StateMetadata<HotelDTO> = {
      items: [],
      total: 0,
      loading: false,
      dataNotFound: false,
    };
    patchState({ apiHotels });
  }

  @Action(HotelActions.LoadHotelListBySearchReq)
  LoadHotelListBySearchReq(
    { dispatch, patchState }: StateContext<HotelStateModel>,
    { searchReq }: HotelActions.LoadHotelListBySearchReq
  ): void {
    const searchRequest = {
      ...searchReq,
      sortField: searchReq.sortField ?? 'name',
      sortOrder: 'asc',
    };
    patchState({ searchRequest: searchRequest });
    this._resetMetadata(patchState);

    this._hotelService
      .loadHotelsBySearchReq(searchRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: HotelSearchResponse) =>
          dispatch(new HotelActions.LoadHotelListBySearchReqSuccess(response)),
        error: (err: HttpErrorResponse) =>
          dispatch(new HotelActions.LoadHotelListError(err)),
      });
  }

  @Action(HotelActions.LoadHotelListBySearchReqSuccess)
  loadHotelListBySearchReqSuccess(
    { patchState }: StateContext<HotelStateModel>,
    { response }: HotelActions.LoadHotelListBySearchReqSuccess
  ): void {
    const itemList: StateMetadata<HotelDTO> = {
      items: response.results ?? [],
      total: response.results.length,
    };
    patchState({ itemList });
  }

  @Action(HotelActions.LoadHotelListBySearchReqError)
  loadHotelListBySearchReqError(
    { patchState }: StateContext<HotelStateModel>,
    { error }: HotelActions.LoadHotelListBySearchReqError
  ): void {
    this._resetMetadata(patchState);
  }

  @Action(HotelActions.DeleteHotelById)
  deleteHotelById(
    { dispatch }: StateContext<HotelStateModel>,
    { id }: HotelActions.DeleteHotelById
  ): void {
    this._hotelService
      .deleteHotelById(id)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new HotelActions.DeleteHotelByIdSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new HotelActions.DeleteHotelByIdError(err)),
      });
  }

  @Action(HotelActions.DeleteHotelByIdSuccess)
  deleteHotelByIdSuccess({
    dispatch,
    getState,
  }: StateContext<HotelStateModel>): void {
    const searchReq = getState().searchRequest;
    dispatch(new HotelActions.LoadHotelListBySearchReq({ ...searchReq }));
  }

  @Action(HotelActions.DeleteHotelByIdError)
  deleteHotelByIdError(
    { patchState }: StateContext<HotelStateModel>,
    { error }: HotelActions.DeleteHotelByIdError
  ): void {}

  @Action(HotelActions.AddApiHotel)
  AddApiHotel(
    { dispatch }: StateContext<HotelStateModel>,
    { hotel, destinationEntityId }: HotelActions.AddApiHotel
  ): void {
    this._hotelService
      .createApiHotel(hotel, destinationEntityId)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new HotelActions.AddApiHotelSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new HotelActions.AddApiHotelError(err)),
      });
  }

  @Action(HotelActions.AddApiHotelSuccess)
  AddApiHotelSuccess({
    dispatch,
    getState,
  }: StateContext<HotelStateModel>): void {
    const searchReq = getState().searchRequest;
    dispatch(new HotelActions.LoadHotelListBySearchReq({ ...searchReq }));
  }

  @Action(HotelActions.AddApiHotelError)
  AddApiHotelError({ error }: HotelActions.AddApiHotelError): void {}

  @Action(HotelActions.LoadHotelBookingsList)
  LoadHotelBookingsList(
    { dispatch }: StateContext<HotelStateModel>,
    {
      destination_id,
      checkin,
      checkout,
      noOfPassengers,
    }: HotelActions.LoadHotelBookingsList
  ): void {
    this._hotelService
      .searchHotels(destination_id, checkin, checkout, noOfPassengers)
      .pipe(take(1))
      .subscribe({
        next: (response: HotelDTO[]) =>
          dispatch(new HotelActions.LoadHotelBookingsListSuccess(response)),
        error: (err: HttpErrorResponse) =>
          dispatch(new HotelActions.LoadHotelBookingsListtError()),
      });
  }

  @Action(HotelActions.LoadHotelBookingsListSuccess)
  LoadHotelBookingsListSuccess(
    { patchState }: StateContext<HotelStateModel>,
    { hotelBookings }: HotelActions.LoadHotelBookingsListSuccess
  ): void {
    patchState({ hotelBookings });
  }

  @Action(HotelActions.LoadHotelBookingsListtError)
  LoadHotelBookingsListtError({
    patchState,
  }: StateContext<HotelStateModel>): void {
    patchState({ hotelBookings: [] });
  }

  @Action(HotelActions.SetSelectedHotelBooking)
  SetSelectedHotelBooking(
    { patchState }: StateContext<HotelStateModel>,
    { selectedHotelBooking }: HotelActions.SetSelectedHotelBooking
  ): void {
    patchState({ selectedHotelBooking, hotelIsSelected: true });
  }

  @Action(HotelActions.ResetSelectedHotelBooking)
  ResetSelectedHotelBooking({
    patchState,
  }: StateContext<HotelStateModel>): void {
    patchState({ selectedHotelBooking: {}, hotelIsSelected: false });
  }

  @Action(HotelActions.CreateHotelAndAssignUser)
  CreateHotelAndAssignUser(
    { dispatch }: StateContext<HotelStateModel>,
    { hotel, userId }: HotelActions.CreateHotelAndAssignUser
  ): void {
    this._hotelService
      .createHotelAndAssignUser(hotel, userId)
      .pipe(take(1))
      .subscribe({
        next: () =>
          dispatch(new HotelActions.CreateHotelAndAssignUserSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new HotelActions.CreateHotelAndAssignUserError(err)),
      });
  }

  @Action(HotelActions.CreateHotelAndAssignUserSuccess)
  CreateHotelAndAssignUserSuccess({
    dispatch,
    getState,
  }: StateContext<HotelStateModel>): void {}

  @Action(HotelActions.CreateHotelAndAssignUserError)
  CreateHotelAndAssignUserError({
    error,
  }: HotelActions.CreateHotelAndAssignUserError): void {}

  private _resetMetadata(
    patchState: (val: Partial<HotelStateModel>) => HotelStateModel
  ): void {
    const itemList: StateMetadata<HotelDTO> = {
      items: [],
      total: 0,
    };
    patchState({ itemList });
  }
}
