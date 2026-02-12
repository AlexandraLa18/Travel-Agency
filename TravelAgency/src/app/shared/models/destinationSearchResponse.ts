import { DestinationDTO } from './destinationDTO';

export interface DestinationSearchResponse {
  results: Array<DestinationDTO>;
  total: number;
}
