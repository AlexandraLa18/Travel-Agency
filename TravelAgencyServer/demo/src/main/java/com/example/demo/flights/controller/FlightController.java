package com.example.demo.flights.controller;

import com.example.demo.flights.model.Flight;
import com.example.demo.flights.model.FlightDTO;
import com.example.demo.flights.service.FlightsServiceIF;
import com.example.demo.shared.models.FlightSearchResponseDTO;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.services.FlightApiService;
import com.example.demo.vacations.model.Vacation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@RestController
@RequestMapping("/flights")
public class FlightController {
    private FlightsServiceIF flightsServiceIF;
    FlightApiService service = new FlightApiService();


    public FlightController(FlightsServiceIF flightsServiceIF) {
        this.flightsServiceIF = flightsServiceIF;
    }

    @PostMapping
    public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) {
        return new ResponseEntity<>(flightsServiceIF.createFlight(flight), HttpStatus.OK);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Flight> createFlightAndAssignUser(@PathVariable Long userId, @RequestBody Flight flight) {
        return new ResponseEntity<>(flightsServiceIF.createFlightAndAssignUser(flight, userId), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Flight>> getAllFlights() {
        List<Flight> flightList = flightsServiceIF.getAllFlights();
        if (flightList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(flightList, HttpStatus.OK);
    }

    @GetMapping("/byCity")
    public List<Flight> getFlightsByCity(@RequestParam String city) {
        return flightsServiceIF.getFlightsByCity(city);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        return flightsServiceIF.getFlightById(id)
                .map(flight -> new ResponseEntity<>(flight, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PostMapping("/loadFlightsBySearchReq")
    public ResponseEntity<FlightSearchResponseDTO> loadFlightsBySearchReq(@RequestBody SearchRequestDTO searchRequest) throws ValidationException {
        return new ResponseEntity<>(flightsServiceIF.loadFlightsBySearchReq(searchRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFlightById(@PathVariable Long id) {
        return flightsServiceIF.deleteFlightById(id);
    }

    @GetMapping("/api/{fromName}/{toName}/{departDate}/{returnDate}/{noPassengers}/{cabinClass}")
    public ResponseEntity<List<Flight>> getApiFlights(
            @PathVariable String fromName,
            @PathVariable String toName,
            @PathVariable String departDate,
            @PathVariable String returnDate, @PathVariable int noPassengers, @PathVariable String cabinClass)   throws ValidationException {
        return new ResponseEntity<>(flightsServiceIF.requestApiFlights(fromName, toName, departDate, returnDate, noPassengers, cabinClass), HttpStatus.OK);
    }

    @GetMapping("/api/flightid/{fromName}")
    public ResponseEntity<String> getApiFlightId( @PathVariable String fromName)  throws ValidationException {
        String flightId = service.getFlightIdByQuery(fromName);
        return new ResponseEntity<>(flightId, HttpStatus.OK);
    }

    @GetMapping("/getFlightBookings")
    public ResponseEntity<List<Flight>> getFlightBookings(
            @RequestParam Long fromDestinationId,
            @RequestParam Long toDestinationId,
            @RequestParam String departureOrigin,
            @RequestParam String departureDestination,
            @RequestParam int noOfPassengers) {
        List<Flight> flights = flightsServiceIF.getFlightBookings(fromDestinationId, toDestinationId, departureOrigin, departureDestination, noOfPassengers);
        return ResponseEntity.ok(flights);
    }

    @PutMapping("/{flightId}/user/{userId}")
    public ResponseEntity<Flight> assignUserToFlight(@PathVariable Long flightId, @PathVariable Long userId) {
        Flight flight = flightsServiceIF.assignUserToFlight(flightId, userId);
        return ResponseEntity.ok(flight);
    }

    @GetMapping("/flightsListOfUser/{userId}")
    public ResponseEntity<List<Flight>> getFlightsByUserId(@PathVariable Long userId) {
        List<Flight> flights = flightsServiceIF.getFlightsByUserId(userId);
        return ResponseEntity.ok(flights);
    }

    @PutMapping("/cancel/{flightId}")
    public ResponseEntity<FlightDTO> releaseFlight(@PathVariable Long flightId) {
        FlightDTO flightDTO = flightsServiceIF.cancelFlightBooking(flightId);
        if (flightDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(flightDTO);
    }
}
