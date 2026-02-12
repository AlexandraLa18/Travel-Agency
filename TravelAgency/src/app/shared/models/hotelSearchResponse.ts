import { HotelDTO } from './hotelDTO';

export interface HotelSearchResponse {
  results: Array<HotelDTO>;
  total: number;
}
