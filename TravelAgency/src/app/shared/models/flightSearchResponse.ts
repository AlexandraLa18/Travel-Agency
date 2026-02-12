import { FlightDTO } from './flightDTO';

export interface FlightSearchResponse {
  results: Array<FlightDTO>;
  total: number;
}
