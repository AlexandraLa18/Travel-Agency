export interface FlightSearchReq {
    from: string;
    to: string;
    checkin: string;
    checkout: string;
    adults: number;
    cabinClass: string;
}