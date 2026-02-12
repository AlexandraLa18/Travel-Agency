import { HttpErrorResponse } from '@angular/common/http';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { HotelSearchResponse } from 'src/app/shared/models/hotelSearchResponse';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';

export namespace HotelActions {
  export class AddApiHotel {
    static readonly type = '[Hotel] AddApiHotel';
    constructor(public readonly hotel: HotelDTO, public readonly destinationEntityId: string) {}
  }

  export class AddApiHotelSuccess {
    static readonly type = '[Hotel] AddApiHotelSuccess';
  }

  export class AddApiHotelError {
    static readonly type = '[Hotel] AddApiHotelError';
    constructor(public readonly error: HttpErrorResponse) {}
  }
  export class LoadHotelList {
    static readonly type = '[Hotel] Load Hotel List';
    constructor() {}
  }

  export class LoadHotelListSuccess {
    static readonly type = '[Hotel] Load Hotel List Success';
    constructor(public readonly response: HotelDTO[]) {}
  }

  export class LoadHotelListError {
    static readonly type = '[Hotel] Load Hotel List Error';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class LoadHotelListBySearchReq {
    static readonly type = '[Hotel] LoadHotelListBySearchReq';
    constructor(public readonly searchReq: SearchRequestDTO) {}
  }

  export class LoadHotelListBySearchReqSuccess {
    static readonly type = '[Hotel] LoadHotelListBySearchReqSuccess';
    constructor(public readonly response: HotelSearchResponse) {}
  }

  export class LoadHotelBookingsList {
    static readonly type = '[Hotel] LoadHotelBookingsList';
    constructor(
      public destination_id: number,
      public checkin: string,
      public checkout: string,
      public noOfPassengers: number
    ) {}
  }

  export class LoadHotelBookingsListSuccess {
    static readonly type = '[Hotel] LoadHotelBookingsListSuccess';
    constructor(public readonly hotelBookings: HotelDTO[]) {}
  }

  export class LoadHotelBookingsListtError {
    static readonly type = '[Hotel] LoadHotelBookingsListtError';
  }

  export class LoadHotelListBySearchReqError {
    static readonly type = '[Hotel] LoadHotelListBySearchReqError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class DeleteHotelById {
    static readonly type = '[Hotel] DeleteHotelById';
    constructor(public readonly id: number | undefined) {}
  }

  export class DeleteHotelByIdSuccess {
    static readonly type = '[Hotel] DeleteHotelByIdSuccess';
  }

  export class DeleteHotelByIdError {
    static readonly type = '[Hotel] DeleteHotelByIdError';
    constructor(public readonly error: HttpErrorResponse) {}
  }


  export class LoadApiHotelList {
    static readonly type = '[Hotel] LoadApiHotelList';
    constructor(
      public readonly destinationEntityID: string,
      public readonly checkin: string,
      public readonly checkout: string,
      public readonly rooms: number,
      public readonly adults: number,
      public readonly resultsPErPAge: number,
      public readonly page: number
    ) {}
  }

  export class LoadApiHotelListSuccess {
    static readonly type = '[Hotel] LoadApiHotelListSuccess';
    constructor(public readonly response: HotelDTO[]) {}
  }

  export class LoadApiHotelListError {
    static readonly type = '[Hotel] LoadApiHotelListError';
  }

  export class LoadApiHotelsListByDestinationCity {
    static readonly type = '[Hotel] LoadApiHotelsListByDestinationCity';
    constructor(
      public readonly destinationCity: string,
      public readonly checkin: string | undefined,
      public readonly checkout: string | undefined,
      public readonly rooms: number,
      public readonly adults: number | undefined,
      public readonly resultsPErPAge: number,
      public readonly page: number
    ) {}
  }

  export class LoadApiHotelsListByDestinationCitySuccess {
    static readonly type = '[Hotel] LoadApiHotelsListByDestinationCitySuccess';
    constructor(public readonly response: HotelDTO[]) {}
  }

  export class LoadApiHotelsListByDestinationCityError {
    static readonly type = '[Hotel] LoadApiHotelsListByDestinationCityError';
  }
  
  export class SetSelectedHotelBooking {
    static readonly type = '[Hotel] SetSelectedHotelBooking';
    constructor(public readonly selectedHotelBooking: HotelDTO) {}
  }

  export class ResetSelectedHotelBooking {
    static readonly type = '[Hotel] ResetSelectedHotelBooking';
  }

  export class CreateHotelAndAssignUser {
    static readonly type = '[Hotel] CreateHotelAndAssignUser';
    constructor(
      public readonly hotel: HotelDTO,
      public readonly userId: number | null | undefined,
    ) {}
  }

  export class CreateHotelAndAssignUserSuccess {
    static readonly type = '[Hotel] CreateHotelAndAssignUserSuccess';
  }

  export class CreateHotelAndAssignUserError {
    static readonly type = '[Hotel] CreateHotelAndAssignUserError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

}
