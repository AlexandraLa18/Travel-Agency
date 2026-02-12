import { DestinationDTO } from './destinationDTO';

export interface HotelDTO {
  id?: number;
  destination?: DestinationDTO;
  name?: string;
  address?: string;
  checkin?: string;
  checkout?: string;
  stars?: string;
  distance?: string;
  relevantPoiDistance?: string;
  price?: string;
  entityId?: string;
  description?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  amenitiesDescription?: string;
  noticeFromTheHotel?: string;
  rooms?: number;
  adults?: number;
  hasRestaurant?: boolean;
  hasRoomService?: boolean;
  noSmoking?: boolean;
  hasWifi?: boolean;
  hasBar?: boolean;
  petAllow?: boolean;
  used?: boolean;
}