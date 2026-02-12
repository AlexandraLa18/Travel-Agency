import { HttpErrorResponse } from "@angular/common/http";
import { FlightDTO } from "src/app/shared/models/flightDTO";
import { HotelDTO } from "src/app/shared/models/hotelDTO";
import { SimpleVacationDTO } from "src/app/shared/models/simpleVacationDTO";
import { VacationDTO } from "src/app/shared/models/vacationDTO";

export namespace ReservationsActions {
  export class LoadVacations {
    static readonly type = '[Reservations] LoadVacations';
    constructor(public readonly user_id: number | null | undefined) {}
  }

  export class LoadVacationsSuccess {
    static readonly type = '[Reservations] LoadVacationsSuccess';
    constructor(public readonly response: VacationDTO[], public readonly user_id: number | null | undefined) {}
  }

  export class LoadVacationsError {
    static readonly type = '[Reservations] LoadVacationsError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class CancelVacation {
    static readonly type = '[Reservations] CancelVacation';
    constructor(public readonly vacation_id: number | null | undefined) {}
  }

  export class CancelVacationSuccess {
    static readonly type = '[Reservations] CancelVacationSuccess';
  }

  export class CancelVacationError {
    static readonly type = '[Reservations] CancelVacationError';
  }

  export class CancelSimpleVacation {
    static readonly type = '[Reservations] CancelSimpleVacation';
    constructor(public readonly vacation_id: number | null | undefined) {}
  }

  export class CancelSimpleVacationSuccess {
    static readonly type = '[Reservations] CancelSimpleVacationSuccess';
  }

  export class CancelSimpleVacationError {
    static readonly type = '[Reservations] CancelSimpleVacationError';
  }

  export class LoadSimpleVacation {
    static readonly type = '[Reservations] LoadSimpleVacation';
    constructor(public readonly user_id: number | null | undefined) {}
  }

  export class LoadSimpleVacationSuccess {
    static readonly type = '[Reservations] LoadSimpleVacationSuccess';
    constructor(public readonly response: SimpleVacationDTO[], public readonly user_id: number | null | undefined) {}
  }

  export class LoadSimpleVacationError {
    static readonly type = '[Reservations] LoadSimpleVacationError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class LoadFlights {
    static readonly type = '[Reservations] LoadFlights';
    constructor(public readonly user_id: number | null | undefined) {}
  }

  export class LoadFlightsSuccess {
    static readonly type = '[Reservations] LoadFlightsSuccess';
    constructor(public readonly response: FlightDTO[], public readonly user_id: number | null | undefined) {}
  }

  export class LoadFlightsError {
    static readonly type = '[Reservations] LoadFlightsError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class LoadHotels {
    static readonly type = '[Reservations] LoadHotels';
    constructor(public readonly user_id: number | null | undefined) {}
  }

  export class LoadHotelsSuccess {
    static readonly type = '[Reservations] LoadHotelsSuccess';
    constructor(public readonly response: HotelDTO[], public readonly user_id: number | null | undefined) {}
  }

  export class LoadHotelsError {
    static readonly type = '[Reservations] LoadHotelsError';
    constructor(public readonly error: HttpErrorResponse) {}
  }
  
  export class CancelHotel {
    static readonly type = '[Reservations] CancelHotel';
    constructor(public readonly hotel_id: number | null | undefined) {}
  }

  export class CancelHotelSuccess {
    static readonly type = '[Reservations] CancelHotelSuccess';
  }

  export class CancelHotelError {
    static readonly type = '[Reservations] CancelHotelError';
  }

  export class CancelFlights {
    static readonly type = '[Reservations] CancelFlights';
    constructor(public readonly flight_id: number | null | undefined) {}
  }

  export class CancelFlightsSuccess {
    static readonly type = '[Reservations] CancelFlightsSuccess';
  }

  export class CancelFlightsError {
    static readonly type = '[Reservations] CancelFlightsError';
  }
}
