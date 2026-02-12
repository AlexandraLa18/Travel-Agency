import { FlightDTO } from './flightDTO';
import { HotelDTO } from './hotelDTO';
import { UserDTO } from './userDTO.model';

export interface VacationDTO {
  vacation_id?: number | null;
  flight?: FlightDTO;
  user?: UserDTO;
  hotel: HotelDTO;
  type: string;
  description: string;
  title: string;
  totalPrice: string | null;
  showInDashboard: boolean;
  noOfPassengers: number;
  used?: boolean;
}
