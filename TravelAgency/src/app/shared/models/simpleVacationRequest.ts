import { HotelDTO } from "./hotelDTO";

export interface SimpleVacationRequest {
    hotel: HotelDTO;
    userId?: number | null;
}