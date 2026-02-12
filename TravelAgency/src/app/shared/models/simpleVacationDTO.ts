import { HotelDTO } from "./hotelDTO";
import { UserDTO } from "./userDTO.model";

export interface SimpleVacationDTO {
  simpleVacation_id?: number | null;
  hotel: HotelDTO;
  user?: UserDTO;
  type: string;
  title: string;
  description: string;
  totalPrice: string | null;
  showInDashboard: boolean;
  noOfPassengers: number;
  used?: boolean;
}