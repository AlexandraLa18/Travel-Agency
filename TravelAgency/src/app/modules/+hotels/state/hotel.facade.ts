import { Injectable } from "@angular/core";
import { HotelState } from "./hotel.state";
import { HotelDTO } from "src/app/shared/models/hotelDTO";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { HotelActions } from "./hotel.actions";
import { SearchRequestDTO } from "src/app/shared/models/searchRequestDTO";
import { DestinationDTO } from "src/app/shared/models/destinationDTO";

@Injectable({
  providedIn: 'root',
})
export class HotelFacade {
  @Select(HotelState.items) readonly hotelList$!: Observable<HotelDTO[]>;
  @Select(HotelState.total) readonly total$!: Observable<number>;
  @Select(HotelState.apiHotels) readonly apiHotels$!: Observable<HotelDTO[]>;
  @Select(HotelState.apiHotelsTotal) readonly apiHotelsTotal$!: Observable<number>;
  @Select(HotelState.apiHotelsLoading) readonly apiHotelsLoading$!: Observable<boolean>;
  @Select(HotelState.apiHotelsDataNotFound) readonly apiHotelsDataNotFound$!: Observable<boolean>;
  @Select(HotelState.hotelBookings) readonly hotelBookings$!: Observable<HotelDTO[]>;
  @Select(HotelState.selectedHotelBooking) readonly selectedHotelBooking$!: Observable<HotelDTO>;
  @Select(HotelState.hotelIsSelected) readonly hotelIsSelected$!: Observable<boolean>;

  constructor(private readonly _store: Store) {}

  loadHotelList() {
    this._store.dispatch(new HotelActions.LoadHotelList());
  }

  loadApiHotelsList(destinationEntityID: string, checkin: string, checkout: string, rooms: number, adults: number, resultsPErPAge: number, page: number) {
    this._store.dispatch(new HotelActions.LoadApiHotelList(destinationEntityID, checkin, checkout, rooms, adults, resultsPErPAge, page));
  }

  loadApiHotelsListByDestinationCity(destinationCity: string, checkin: string | undefined, checkout: string | undefined, rooms: number, adults: number | undefined, resultsPErPAge: number, page: number) {
    this._store.dispatch(new HotelActions.LoadApiHotelsListByDestinationCity(destinationCity, checkin, checkout, rooms, adults, resultsPErPAge, page));
  }

  resetApiHotelBookingsList() {
    this._store.dispatch(new HotelActions.LoadApiHotelListError());
  }

  loadHotelListBySearchReq(searchReq: SearchRequestDTO) {
    this._store.dispatch(new HotelActions.LoadHotelListBySearchReq(searchReq));
  }

  deleteHotelById(id: number | undefined) {
    this._store.dispatch(new HotelActions.DeleteHotelById(id));
  }

  loadHotelBookingsList(destinationID: number, checkin: string, checkout: string, noOfPassengers: number) {
    this._store.dispatch(new HotelActions.LoadHotelBookingsList(destinationID, checkin, checkout, noOfPassengers));
  }

  resetHotelBookingsList() {
    this._store.dispatch(new HotelActions.LoadHotelBookingsListtError());
  }

  addApiHotel(hotel: HotelDTO, destinationEntityId: string){
    this._store.dispatch(new HotelActions.AddApiHotel(hotel, destinationEntityId));
  }

  setSelectedHotelBooking(selectedHotelBooking: HotelDTO){
    this._store.dispatch(new HotelActions.SetSelectedHotelBooking(selectedHotelBooking));
  }

  resetSelectedHotelBooking(){
    this._store.dispatch(new HotelActions.ResetSelectedHotelBooking());
  }

  createHotelAndAssignUser(hotel: HotelDTO, user_id: number | null | undefined){
    this._store.dispatch(new HotelActions.CreateHotelAndAssignUser(hotel, user_id));
  }
}
