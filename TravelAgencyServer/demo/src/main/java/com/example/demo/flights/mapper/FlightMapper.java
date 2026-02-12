package com.example.demo.flights.mapper;

import com.example.demo.destinations.mapper.DestinationMapper;
import com.example.demo.flights.model.Flight;
import com.example.demo.flights.model.FlightDTO;

public class FlightMapper {

    public static FlightDTO toDTO(Flight flight) {
        if (flight == null) {
            return null;
        }

        FlightDTO dto = new FlightDTO();
        dto.setFlight_id(flight.getFlight_id());
        dto.setDepartureOrigin(flight.getDepartureOrigin());
        dto.setArrivalOrigin(flight.getArrivalOrigin());
        dto.setDepartureDestination(flight.getDepartureDestination());
        dto.setArrivalDestination(flight.getArrivalDestination());
        dto.setPrice(flight.getPrice());
        dto.setDurationInMinutesDepart(flight.getDurationInMinutesDepart());
        dto.setDurationInMinutesReturn(flight.getDurationInMinutesReturn());
        dto.setCompanyNameDepart(flight.getCompanyNameDepart());
        dto.setCompanyNameReturn(flight.getCompanyNameReturn());
        dto.setCompanyLogoDepart(flight.getCompanyLogoDepart());
        dto.setCompanyLogoReturn(flight.getCompanyLogoReturn());
        dto.setFlightPlaceDepart(flight.getFlightPlaceDepart());
        dto.setFlightPlaceReturn(flight.getFlightPlaceReturn());
        dto.setFlightNumberDepart(flight.getFlightNumberDepart());
        dto.setFlightNumberReturn(flight.getFlightNumberReturn());
        dto.setNoPassengers(flight.getNoPassengers());
        dto.setUsed(flight.getUsed());
        dto.setCabinClass(flight.getCabinClass());
        dto.setOriginDisplayCode(flight.getOriginDisplayCode());
        dto.setDestinationDisplayCode(flight.getDestinationDisplayCode());
        dto.setUser(flight.getUser());

        dto.setFromDestination(DestinationMapper.toDTO(flight.getFromDestination()));
        dto.setToDestination(DestinationMapper.toDTO(flight.getToDestination()));

        return dto;
    }
}
