import { HttpErrorResponse } from "@angular/common/http";
import { DestinationDTO } from "src/app/shared/models/destinationDTO";
import { DestinationSearchResponse } from "src/app/shared/models/destinationSearchResponse";
import { SearchRequestDTO } from "src/app/shared/models/searchRequestDTO";

export namespace DestinationsActions {
    export class LoadDestinationsList {
      static readonly type = '[Destinations] Load Destinations List';
      constructor() {}
    }
  
    export class LoadDestinationsListSuccess {
      static readonly type = '[Destinations] LoadDestinationsListSuccess';
      constructor(public readonly response: DestinationDTO[]) {}
    }
  
    export class LoadDestinationsListError {
      static readonly type = '[Destinations] LoadDestinationsListError';
      constructor(public readonly error: HttpErrorResponse) {}
    }
  
    export class LoadDestinationsListBySearchReq {
      static readonly type = '[Destinations] LoadDestinationsListBySearchReq';
      constructor(public readonly searchReq: SearchRequestDTO) {}
    }
  
    export class LoadDestinationsListBySearchReqSuccess {
      static readonly type = '[Destinations] LoadDestinationsListBySearchReqSuccess';
      constructor(public readonly response: DestinationSearchResponse) {}
    }
  
    export class LoadDestinationsListBySearchReqError {
      static readonly type = '[Destinations] LoadDestinationsListBySearchReqError';
      constructor(public readonly error: HttpErrorResponse) {}
    }

    export class LoadRomaniaDestinationsList {
      static readonly type = '[Destinations] LoadRomaniaDestinationsList';
      constructor() {}
    }
  
    export class LoadRomaniaDestinationsListSuccess {
      static readonly type = '[Destinations] LoadRomaniaDestinationsListSuccess';
      constructor(public readonly response: DestinationDTO[]) {}
    }
  
    export class LoadRomaniaDestinationsListError {
      static readonly type = '[Destinations] LoadRomaniaDestinationsListError';
      constructor(public readonly error: HttpErrorResponse) {}
    }

    export class LoadWorldsPopularDestinationsList {
      static readonly type = '[Destinations] LoadWorldsPopularDestinationsList';
      constructor() {}
    }
  
    export class LoadWorldsPopularDestinationsListSuccess {
      static readonly type = '[Destinations] LoadWorldsPopularDestinationsListSuccess';
      constructor(public readonly response: DestinationDTO[]) {}
    }
  
    export class LoadWorldsPopularDestinationsListError {
      static readonly type = '[Destinations] LoadWorldsPopularDestinationsListError';
      constructor(public readonly error: HttpErrorResponse) {}
    }

    export class AddDestination {
      static readonly type = '[Destinations] AddDestination';
      constructor(public readonly destination: DestinationDTO) {}
    }
  
    export class AddDestinationSuccess {
      static readonly type = '[Destinations] AddDestinationSuccess';
      constructor() {}
    }
  
    export class AddDestinationError {
      static readonly type = '[Destinations] AddDestinationError';
      constructor(public readonly error: HttpErrorResponse) {}
    }
  
    export class DeleteDestinationById {
      static readonly type = '[Destinations] DeleteDestinationsById';
      constructor(public readonly id: number) {}
    }
  
    export class DeleteDestinationByIdSuccess {
      static readonly type = '[Destinations] DeleteDestinationsByIdSuccess';
    }
  
    export class DeleteDestinationByIdError {
      static readonly type = '[Destinations] DeleteDestinationsByIdError';
      constructor(public readonly error: HttpErrorResponse) {}
    }

    export class LoadApiDestinationsList {
      static readonly type = '[Destinations] LoadApiDestinationsList';
      constructor(public readonly name: string) {}
    }
  
    export class LoadApiDestinationsListSuccess {
      static readonly type = '[Destinations] LoadApiDestinationsListSuccess';
      constructor(public readonly response: DestinationDTO[]) {}
    }
  
    export class LoadApiDestinationsListError {
      static readonly type = '[Destinations] LoadApiDestinationsListError';
    }
  }