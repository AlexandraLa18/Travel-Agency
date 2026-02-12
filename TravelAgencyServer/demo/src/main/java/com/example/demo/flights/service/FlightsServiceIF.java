package com.example.demo.flights.service;

import com.example.demo.flights.model.Flight;
import com.example.demo.flights.model.FlightDTO;
import com.example.demo.shared.models.FlightSearchResponseDTO;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.vacations.model.Vacation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface FlightsServiceIF {
    Flight createFlight(Flight flight);
    Flight createFlightAndAssignUser(Flight flight, Long userId);
    List<Flight> getAllFlights();
    Optional<Flight> getFlightById(Long id);
    FlightSearchResponseDTO loadFlightsBySearchReq(SearchRequestDTO searchRequest);
    public List<Flight> getFlightBookings(Long fromDestinationId, Long toDestinationId, String departureOrigin, String departureDestination,  int noOfPassengers);
    ResponseEntity<?> deleteFlightById(Long id);
    List<Flight> requestApiFlights(String fromName, String toName, String departeDate, String returnDate, int noPassengers, String cabinClass);
    List<Flight> getFlightsByCity(String city);
    Flight assignUserToFlight(Long flightId, Long userId);
    List<Flight> getFlightsByUserId(Long userId);
    FlightDTO cancelFlightBooking(Long flightId);

}
