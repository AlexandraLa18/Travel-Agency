package com.example.demo.flights.service.impl;
import com.example.demo.destinations.model.Destination;
import com.example.demo.flights.mapper.FlightMapper;
import com.example.demo.flights.model.Flight;
import com.example.demo.flights.model.FlightDTO;
import com.example.demo.flights.repository.FlightRepository;
import com.example.demo.flights.service.FlightsServiceIF;
import com.example.demo.shared.models.FlightSearchResponseDTO;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.services.EmailSender;
import com.example.demo.shared.services.FlightApiService;
import com.example.demo.user.model.User;
import com.example.demo.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.demo.destinations.repository.DestinationRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FlightServiceImpl implements FlightsServiceIF {
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private DestinationRepository destinationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailSender emailSender;

    public FlightServiceImpl(FlightRepository flightRepository, DestinationRepository destinationRepository, UserRepository userRepository, EmailSender emailSender) {
        this.flightRepository = flightRepository;
        this.destinationRepository = destinationRepository;
        this.userRepository = userRepository;
        this.emailSender = emailSender;
    }

    @Override
    public Flight createFlight(Flight flight) {
        return flightRepository.saveAndFlush(flight);
    }

    @Override
    public Flight createFlightAndAssignUser(Flight flight, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("Invalid user ID: " + userId)
        );
        flight.setUser(user);
        flight.setUsed(true);
        Flight savedFlight = flightRepository.save(flight);
        sendConfirmationEmail(flight,user);

        return savedFlight;
    }

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAllWithDestinationsFetched();
    }

    @Override
    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findByIdWithDestinationsFetched(id);
    }

    @Override
    public FlightSearchResponseDTO loadFlightsBySearchReq(SearchRequestDTO searchRequest) {
        int x = searchRequest.getPaginationDTO().getPage();
        int y = searchRequest.getPaginationDTO().getPageSize();

        List<Flight> all = getAllFlights();
        List<Flight> newList = new ArrayList<>();
        int i = x*y;
        int z = x*y+y;
        while(i>=0 && i < z && i < all.size()) {
            if (!all.get(i).isUsed()) newList.add(all.get(i));
            i++;
        }
        List<FlightDTO> dtoList = new ArrayList<>();
        if(newList.size() > 0) {
            for (Flight flight : newList) {
                dtoList.add(FlightMapper.toDTO(flight));
            }
        }
        final FlightSearchResponseDTO responseDTO = new FlightSearchResponseDTO();
        responseDTO.setResults(dtoList);
        responseDTO.setTotal((long) all.size());

        return responseDTO;
    }

    @Override
    public ResponseEntity<?> deleteFlightById(Long id) {
        if (flightRepository.existsById(id)) {
            flightRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<Flight> requestApiFlights(String fromName, String toName, String departeDate, String returnDate, int noPassengers, String cabinClass) {
        Destination fromDestination = destinationRepository.findByCity(fromName);
        Destination toDestination = destinationRepository.findByCity(toName);

        //get id's for flights req
        FlightApiService service = new FlightApiService();
        String fromId = service.getFlightIdByQuery(fromName);
        String toId = service.getFlightIdByQuery(toName);
        List<Flight> flights = service.getFlightsFromApi(fromId,toId,departeDate,returnDate, fromDestination, toDestination, noPassengers, cabinClass);
        return flights;
    }

    @Override
    public List<Flight> getFlightsByCity(String city) {
        return flightRepository.findByDestinationCity(city);
    }

    @Override
    @Transactional
    public Flight assignUserToFlight(Long flightId, Long userId) {
        Flight flight = new Flight();
        User user = new User();

        if (flightId != null) {
            flight = flightRepository.findByIdWithDetails(flightId);
        }
        if(userId!=null){
            user = userRepository.findById(userId).orElse(null);
        }
        if (user == null || flight == null) {
            throw new RuntimeException("User or Vacation not found");
        }
        flight.setUser(user);
        flight.setUsed(true);
        Flight savedFlight = flightRepository.saveAndFlush(flight);
        sendConfirmationEmail(flight,user);
        return savedFlight;
    }

    @Override
    public List<Flight> getFlightsByUserId(Long userId) {
        return flightRepository.findByUserIdFetchDetails(userId);
    }

    @Override
    public FlightDTO cancelFlightBooking(Long flightId) {
        return flightRepository.findById(flightId).map(flight -> {
            flight.setUser(null);
            flight.setUsed(false);
            Flight savedFlight = flightRepository.save(flight);
            return FlightMapper.toDTO(savedFlight);
        }).orElse(null);
    }

    @Override
    public List<Flight> getFlightBookings(Long fromDestinationId, Long toDestinationId, String departureOrigin, String departureDestination, int noOfPassengers) {
        List<Flight> allFlights = getAllFlights();

        return allFlights.stream()
                .filter(flight -> flight.getFromDestination().getDestination_id().equals(fromDestinationId))
                .filter(flight -> flight.getToDestination().getDestination_id().equals(toDestinationId))
                .filter(flight -> flight.getDepartureOrigin()!=null &&
                        flight.getDepartureOrigin().substring(0, 10).equals(departureOrigin))
                .filter(flight -> flight.getDepartureDestination() != null &&
                        flight.getDepartureDestination().substring(0, 10).equals(departureDestination))
                .filter(flight -> flight.isUsed() == false)
                .filter(flight -> flight.getNoPassengers() == noOfPassengers)
                .collect(Collectors.toList());
    }

    public void sendConfirmationEmail(Flight flight, User user){
        // Send email to the user
        String subject = "Your Flight Booking Confirmation and Payment Details";
        String text = String.format("Hi,\n\n" +
                        "We are pleased to confirm your flight booking with %s. Here are the details of your reservation:\n\n" +
                        "Flight Details:\n" +
                        "- Flight Number: %s\n" +
                        "- Departure: %s\n" +
                        "- Arrival: %s\n" +
                        "- Booking reference: %s\n\n" +
                        "To complete your booking, please proceed with the payment of %s to the following bank account. Kindly ensure the payment is made at least one month before your departure date.\n\n" +
                        "Bank Account Details:\n" +
                        "- Bank Name: BRD\n" +
                        "- Account Name: Lamba Emilia Alexandra\n" +
                        "- Account Number: 123456789012\n" +
                        "- IBAN: GB33BUKB20201555555555 \n" +
                        "Please include your booking reference number in the payment details for processing.\n\n" +
                        "We appreciate your prompt attention to this matter. Should you have any questions or need further assistance, please do not hesitate to contact our customer service team at this email.\n\n" +
                        "Thank you for choosing E-Travel. We look forward to serving you.\n\n" +
                        "Best regards,\n" +
                        "E-Travel Team",
                flight.getCompanyNameDepart(), flight.getFlightNumberDepart(), flight.getDepartureOrigin(), flight.getDepartureDestination(),
                flight.getFlight_id(), flight.getPrice());
        emailSender.sendEmail(user.getEmail(), subject, text);
    }

}
