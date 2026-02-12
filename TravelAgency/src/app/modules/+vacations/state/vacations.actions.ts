import { HttpErrorResponse } from '@angular/common/http';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { SimpleVacationDTO } from 'src/app/shared/models/simpleVacationDTO';
import { SimpleVacationRequest } from 'src/app/shared/models/simpleVacationRequest';
import { SimpleVacationSearchReq } from 'src/app/shared/models/simpleVacationSearchReq';
import { SimpleVacationSearchResponse } from 'src/app/shared/models/simpleVacationsSearchResponseDTO';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';
import { VacationRequest } from 'src/app/shared/models/vacationRequest';
import { VacationSearchReq } from 'src/app/shared/models/vacationSearchReq';
import { VacationSearchResponse } from 'src/app/shared/models/vacationSearchResponseDTO';

export namespace VacationsActions {
  export class LoadVacationListBySearchReq {
    static readonly type = '[Vacations] LoadVacationListBySearchReq';
    constructor(public readonly searchReq: SearchRequestDTO) {}
  }

  export class LoadVacationListBySearchReqSuccess {
    static readonly type = '[Vacations] LoadVacationListBySearchReqSuccess';
    constructor(public readonly response: VacationSearchResponse) {}
  }

  export class LoadVacationListBySearchReqError {
    static readonly type = '[Vacations] LoadVacationListBySearchReqError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class LoadVacationsByCityList {
    static readonly type = '[Vacations] LoadVacationsByCityList';
    constructor(public readonly cityName: string) {}
  }

  export class LoadVacationsByCityListSuccess {
    static readonly type = '[Vacations] LoadVacationsByCityListSuccess';
    constructor(
      public readonly response: VacationDTO[],
      public readonly cityName: string
    ) {}
  }

  export class LoadVacationsByCityListError {
    static readonly type = '[Vacations] LoadVacationsByCityListError';
  }

  export class LoadVacationsByCityPeriodAdults {
    static readonly type = '[Vacations] LoadVacationsByCityPeriodAdults';
    constructor(public readonly vacationSearchReq: VacationSearchReq) {}
  }

  export class LoadVacationsByCityPeriodAdultsSuccess {
    static readonly type = '[Vacations] LoadVacationsByCityPeriodAdultsSuccess';
    constructor(
      public readonly response: SimpleVacationDTO[],
      public readonly vacationSearchReq: VacationSearchReq
    ) {}
  }

  export class LoadVacationsByCityPeriodAdultsError {
    static readonly type = '[Vacations] LoadVacationsByCityPeriodAdultsError';
  }

  export class AddVacation {
    static readonly type = '[Vacations] AddVacation';
    constructor(public readonly vacation: VacationDTO) {}
  }

  export class AddVacationSuccess {
    static readonly type = '[Vacations] AddVacationSuccess';
  }

  export class AddVacationError {
    static readonly type = '[Vacations] AddVacationError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class CreateVacationByUser {
    static readonly type = '[Vacations] CreateVacationByUser';
    constructor(public readonly vacationReq: VacationRequest) {}
  }

  export class CreateVacationByUserSuccess {
    static readonly type = '[Vacations] CreateVacationByUserSuccess';
  }

  export class CreateVacationByUserError {
    static readonly type = '[Vacations] CreateVacationByUserError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class DeleteVacationById {
    static readonly type = '[Vacations] DeleteVacationById';
    constructor(public readonly id: number | undefined | null) {}
  }

  export class DeleteVacationByIdSuccess {
    static readonly type = '[Vacations] DeleteVacationByIdSuccess';
  }

  export class DeleteVacationByIdError {
    static readonly type = '[Vacations] DeleteVacationByIdError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class LoadHotelBookingsList {
    static readonly type = '[Vacations] LoadHotelBookingsList';
    constructor(
      public destination_id: number,
      public checkin: string,
      public checkout: string,
      public noOfPassengers: number
    ) {}
  }

  export class LoadHotelBookingsListSuccess {
    static readonly type = '[Vacations] LoadHotelBookingsListSuccess';
    constructor(public readonly hotelBookings: HotelDTO[]) {}
  }

  export class LoadHotelBookingsListtError {
    static readonly type = '[Vacations] LoadHotelBookingsListtError';
  }

  export class LoadFlightBookingsList {
    static readonly type = '[Vacations] LoadFlightBookingsList';
    constructor(
      public fromDestination_id: number,
      public toDestination_id: number,
      public checkin: string,
      public checkout: string,
      public noOfPassengers: number
    ) {}
  }

  export class LoadFlightBookingsListSuccess {
    static readonly type = '[Vacations] LoadFlightBookingsListSuccess';
    constructor(public readonly flightBookings: FlightDTO[]) {}
  }

  export class LoadFlightBookingsListError {
    static readonly type = '[Vacations] LoadFlightBookingsListError';
  }

  export class SetSelectedFlightBooking {
    static readonly type = '[Vacations] SetSelectedFlightBooking';
    constructor(public readonly selectedFlightBooking: FlightDTO) {}
  }

  export class ResetSelectedFlightBooking {
    static readonly type = '[Vacations] ResetSelectedFlightBooking';
  }

  //simple vacations
  export class LoadSimpleVacationListBySearchReq {
    static readonly type =
      '[SimpleVacations] LoadSimpleVacationListBySearchReq';
    constructor(public readonly searchReq: SearchRequestDTO) {}
  }

  export class LoadSimpleVacationListBySearchReqSuccess {
    static readonly type =
      '[SimpleVacations] LoadSimpleVacationListBySearchReqSuccess';
    constructor(public readonly response: SimpleVacationSearchResponse) {}
  }

  export class LoadSimpleVacationListBySearchReqError {
    static readonly type =
      '[SimpleVacations] LoadSimpleVacationListBySearchReqError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class LoadSimpleVacationsByCityList {
    static readonly type = '[SimpleVacations] LoadSimpleVacationsByCityList';
    constructor(public readonly cityName: string) {}
  }

  export class LoadSimpleVacationsByCityListSuccess {
    static readonly type =
      '[SimpleVacations] LoadSimpleVacationsByCityListSuccess';
    constructor(
      public readonly response: SimpleVacationDTO[],
      public readonly cityName: string
    ) {}
  }

  export class LoadSimpleVacationsByCityListError {
    static readonly type =
      '[SimpleVacations] LoadSimpleVacationsByCityListError';
  }

  export class LoadSimpleVacationsByCityPeriodAdults {
    static readonly type =
      '[SimpleVacations] LoadSimpleVacationsByCityPeriodAdults';
    constructor(
      public readonly simpleVacationSearchReq: SimpleVacationSearchReq
    ) {}
  }

  export class LoadSimpleVacationsByCityPeriodAdultsSuccess {
    static readonly type =
      '[SimpleVacations] LoadSimpleVacationsByCityPeriodAdultsSuccess';
    constructor(
      public readonly response: SimpleVacationDTO[],
      public readonly simpleVacationSearchReq: SimpleVacationSearchReq
    ) {}
  }

  export class LoadSimpleVacationsByCityPeriodAdultsError {
    static readonly type =
      '[SimpleVacations] LoadSimpleVacationsByCityPeriodAdultsError';
  }

  export class AddSimpleVacation {
    static readonly type = '[SimpleVacations] AddSimpleVacation';
    constructor(public readonly vacation: SimpleVacationDTO) {}
  }

  export class AddSimpleVacationSuccess {
    static readonly type = '[SimpleVacations] AddSimpleVacationSuccess';
  }

  export class AddSimpleVacationError {
    static readonly type = '[SimpleVacations] AddSimpleVacationError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class DeleteSimpleVacationById {
    static readonly type = '[SimpleVacations] DeleteSimpleVacationById';
    constructor(public readonly id: number | undefined | null) {}
  }

  export class DeleteSimpleVacationByIdSuccess {
    static readonly type = '[SimpleVacations] DeleteSimpleVacationByIdSuccess';
  }

  export class DeleteSimpleVacationByIdError {
    static readonly type = '[SimpleVacations] DeleteSimpleVacationByIdError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class AssignUserToSimpleVacation {
    static readonly type = '[SimpleVacations] AssignUserToSimpleVacation';
    constructor(
      public readonly simpleVacationId: number | null | undefined,
      public readonly userId: number | null | undefined,
      public readonly byCity: boolean
    ) {}
  }

  export class AssignUserToSimpleVacationSuccess {
    static readonly type =
      '[SimpleVacations] AssignUserToSimpleVacationSuccess';
    constructor(
      public readonly simpleVacation: SimpleVacationDTO,
      public readonly byCity: boolean
    ) {}
  }

  export class AssignUserToSimpleVacationError {
    static readonly type = '[SimpleVacations] AssignUserToSimpleVacationError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class AssignUserToVacation {
    static readonly type = '[Vacations] AssignUserToVacation';
    constructor(
      public readonly vacationId: number | null | undefined,
      public readonly userId: number | null | undefined,
      public readonly byCity: boolean
    ) {}
  }

  export class AssignUserToVacationSuccess {
    static readonly type = '[Vacations] AssignUserToVacationSuccess';
    constructor(
      public readonly vacation: VacationDTO,
      public readonly byCity: boolean
    ) {}
  }

  export class AssignUserToVacationError {
    static readonly type = '[Vacations] AssignUserToVacationError';
    constructor(public readonly error: HttpErrorResponse) {}
  }
}
