import { HttpErrorResponse } from '@angular/common/http';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { FlightSearchResponse } from 'src/app/shared/models/flightSearchResponse';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';

export namespace FlightsActions {
  export class LoadFlightsList {
    static readonly type = '[Flights] LoadFlightsList';
    constructor() {}
  }

  export class LoadFlightsListSuccess {
    static readonly type = '[Flights] LoadFlightsListSuccess';
    constructor(public readonly response: FlightDTO[]) {}
  }

  export class LoadFlightsListError {
    static readonly type = '[Flights] LoadFlightsListError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class LoadApiFlightsList {
    static readonly type = '[Flights] LoadApiFlightsList';
    constructor(
      public readonly fromCityName: string,
      public readonly toCityName: string,
      public readonly departDate: string,
      public readonly returnDate: string,
      public readonly numberOfPassengers: number,
      public readonly cabinClass: string
    ) {}
  }

  export class LoadApiFlightsListSuccess {
    static readonly type = '[Flights] LoadApiFlightsListSuccess';
    constructor(public readonly response: FlightDTO[]) {}
  }

  export class LoadApiFlightsListError {
    static readonly type = '[Flights] LoadApiFlightsListError';
  }

  export class LoadFlightsListBySearchReq {
    static readonly type = '[Flights] LoadFlightsListBySearchReq';
    constructor(public readonly searchReq: SearchRequestDTO) {}
  }

  export class LoadFlightsListBySearchReqSuccess {
    static readonly type = '[Flights] LoadFlightsListBySearchReqSuccess';
    constructor(public readonly response: FlightSearchResponse) {}
  }

  export class LoadFlightssListBySearchReqError {
    static readonly type = '[Flights] LoadFlightsListBySearchReqError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class LoadFlightsByCityList {
    static readonly type = '[Flights] LoadFlightsByCityList';
    constructor(public readonly cityName: string) {}
  }

  export class LoadFlightsByCityListSuccess {
    static readonly type = '[Flights] LoadFlightsByCityListSuccess';
    constructor(
      public readonly response: FlightDTO[],
      public readonly cityName: string
    ) {}
  }

  export class LoadFlightsByCityListError {
    static readonly type = '[Flights] LoadFlightsByCityListError';
  }

  export class AddFlight {
    static readonly type = '[Flights] AddFlight';
    constructor(public readonly flight: FlightDTO) {}
  }

  export class AddFlightSuccess {
    static readonly type = '[Flights] AddFlightSuccess';
    constructor() {}
  }

  export class AddFlightError {
    static readonly type = '[Flights] AddFlightError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class CreateFlightAndAssignUser {
    static readonly type = '[Flights] CreateFlightAndAssignUser';
    constructor(public readonly flight: FlightDTO, public readonly user_id: number | undefined | null) {}
  }

  export class CreateFlightAndAssignUserSuccess {
    static readonly type = '[Flights] CreateFlightAndAssignUserSuccess';
    constructor() {}
  }

  export class CreateFlightAndAssignUserError {
    static readonly type = '[Flights] ACreateFlightAndAssignUserError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class DeleteFlightById {
    static readonly type = '[Flights] DeleteFlightById';
    constructor(public readonly id: number | undefined) {}
  }

  export class DeleteFlightByIdSuccess {
    static readonly type = '[Flights] DeleteFlightByIdSuccess';
  }

  export class DeleteFlightByIdError {
    static readonly type = '[Flights] DeleteFlightByIdError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class LoadFlightBookingsList {
    static readonly type = '[Flights] LoadFlightBookingsList';
    constructor(
      public fromDestination_id: number,
      public toDestination_id: number,
      public checkin: string,
      public checkout: string,
      public noOfPassengers: number
    ) {}
  }

  export class LoadFlightBookingsListSuccess {
    static readonly type = '[Flights] LoadFlightBookingsListSuccess';
    constructor(public readonly flightBookings: FlightDTO[]) {}
  }

  export class LoadFlightBookingsListError {
    static readonly type = '[Flights] LoadFlightBookingsListError';
  }

  export class SetSelectedFlightBooking {
    static readonly type = '[Flights] SetSelectedFlightBooking';
    constructor(public readonly selectedFlightBooking: FlightDTO) {}
  }

  export class ResetSelectedFlightBooking {
    static readonly type = '[Flights] ResetSelectedFlightBooking';
  }

  export class AssignUserToFlight {
    static readonly type = '[Flights] AssignUserToFlight';
    constructor(
      public readonly flightId: number | undefined,
      public readonly userId: number | null | undefined
    ) {}
  }

  export class AssignUserToFlightSuccess {
    static readonly type = '[Flights] AssignUserToFlightSuccess';
    constructor(
      public readonly flight: FlightDTO
    ) {}
  }

  export class AssignUserToFlightError {
    static readonly type = '[Flights] AssignUserToFlightError';
    constructor(public readonly error: HttpErrorResponse) {}
  }
}
