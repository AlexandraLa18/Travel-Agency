import { FlightDTO } from "./flightDTO";
import { HotelDTO } from "./hotelDTO";

export interface VacationRequest {
    hotel: HotelDTO;
    flight: FlightDTO;
    userId?: number | null;
}