import { DestinationDTO } from "./destinationDTO";
import { UserDTO } from "./userDTO.model";

export interface FlightDTO {
    flight_id?: number;
    user?: UserDTO;
    fromDestination?: DestinationDTO;
    toDestination?: DestinationDTO;
    departureOrigin?: string;
    arrivalOrigin?: string;
    departureDestination?: string;
    arrivalDestination?: string;
    price?: string;
    durationInMinutesDepart?: number;
    durationInMinutesReturn?: number;
    companyNameDepart?: string;
    companyNameReturn?: string;
    companyLogoDepart?: string;
    companyLogoReturn?: string;
    flightPlaceDepart?: string;
    flightPlaceReturn?: string;
    flightNumberDepart?: string;
    flightNumberReturn?: string;
    cabinClass?: string;
    noPassengers?: number;
    originDisplayCode?: string;
    destinationDisplayCode?: string;
    used?: boolean;
  }