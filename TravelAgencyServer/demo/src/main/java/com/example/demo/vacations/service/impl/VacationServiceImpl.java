package com.example.demo.vacations.service.impl;

import com.example.demo.flights.model.Flight;
import com.example.demo.flights.repository.FlightRepository;
import com.example.demo.flights.service.impl.FlightServiceImpl;
import com.example.demo.hotels.model.Hotel;
import com.example.demo.hotels.repository.HotelRepository;
import com.example.demo.hotels.service.impl.HotelServiceImpl;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.models.VacationSearchResponseDTO;
import com.example.demo.shared.services.EmailSender;
import com.example.demo.user.model.User;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.vacations.mapper.VacationMapper;
import com.example.demo.vacations.model.Vacation;
import com.example.demo.vacations.model.VacationDTO;
import com.example.demo.vacations.repo.VacationRepository;
import com.example.demo.vacations.service.VacationServiceIF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VacationServiceImpl implements VacationServiceIF {
    @Autowired
    private VacationRepository vacationRepository;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailSender emailSender;

    private HotelServiceImpl hotelService;
    private FlightServiceImpl flightService;

    public VacationServiceImpl(VacationRepository vacationRepository, FlightRepository flightRepository, HotelRepository hotelRepository, UserRepository userRepository, HotelServiceImpl hotelService, FlightServiceImpl flightService) {
        this.vacationRepository = vacationRepository;
        this.flightRepository = flightRepository;
        this.hotelRepository = hotelRepository;
        this.userRepository = userRepository;
        this.hotelService = hotelService;
        this.flightService = flightService;
    }

    @Override
    public Vacation createVacation(Vacation vacation) {
        int total = 0;

        if (vacation.getFlight() != null && vacation.getFlight().getFlight_id()!= null) {
            Flight flight = flightRepository.findById(vacation.getFlight().getFlight_id()).orElse(null);
            if (flight != null) {
                flight.setUsed(true);
                flightRepository.save(flight);
                total += parsePrice(flight.getPrice());
            }
        }

        if (vacation.getHotel() != null && vacation.getHotel().getId() != null) {
            Hotel hotel = hotelRepository.findById(vacation.getHotel().getId()).orElse(null);
            if (hotel != null) {
                hotel.setUsed(true);
                hotelRepository.save(hotel);
                total += parsePrice(hotel.getPrice());
            }
        }
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.GERMANY); // Locale for euro formatting
        String totalPrice = currencyFormat.format(total);
        vacation.setTotalPrice(totalPrice);
        return vacationRepository.saveAndFlush(vacation);
    }

    @Override
    public Vacation createVacationByUser(Hotel hotel, Flight flight, Long userId) {
        Hotel createdHotel = hotelService.createHotel(hotel);
        createdHotel.setUsed(true);
        hotelService.createHotel(createdHotel);

        Flight createdFlight = flightService.createFlight(flight);
        createdFlight.setUsed(true);
        flightService.createFlight(createdFlight);

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Create the Vacation object
        Vacation vacation = new Vacation();
        vacation.setHotel(createdHotel);
        vacation.setFlight(createdFlight);
        vacation.setUser(user);

        double total = 0.0;
        total += parsePrice(flight.getPrice());
        total += parsePrice(hotel.getPrice());

        // Format the total price in EUR
        String totalPrice = String.format("€%.2f", total);
        vacation.setTotalPrice(totalPrice);
        vacation.setType("Created by user");
        vacation.setUsed(true);

        Vacation savedVacation = vacationRepository.saveAndFlush(vacation);
        sendConfirmationEmail(vacation, user);

        return savedVacation;
    }

    @Override
    public Optional<Vacation> getVacationById(Long id) {
        return vacationRepository.findById(id);
    }

    @Override
    public VacationSearchResponseDTO loadVacationsBySearchReq(SearchRequestDTO searchRequest) {
        int x = searchRequest.getPaginationDTO().getPage();
        int y = searchRequest.getPaginationDTO().getPageSize();

        List<Vacation> all = getAllVacations();
        List<Vacation> newList = new ArrayList<>();
        int i = x*y;
        int z = x*y+y;
        while(i>=0 && i < z && i < all.size()) {
            newList.add(all.get(i));
            i++;
        }
        List<VacationDTO> dtoList = new ArrayList<>();
        if(newList.size() > 0) {
            for (Vacation vacation : newList) {
                dtoList.add(VacationMapper.toDTO(vacation));
            }
        }
        final VacationSearchResponseDTO responseDTO = new VacationSearchResponseDTO();
        responseDTO.setResults(dtoList);
        responseDTO.setTotal((long) all.size());

        return responseDTO;
    }

    @Override
    public ResponseEntity<?> deleteVacationById(Long id) {
        if (vacationRepository.existsById(id)) {
            vacationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<Vacation> getAllVacations() {
        List<Vacation> vacations = vacationRepository.findAllWithFlightDestinationsAndHotelFetched();
        return vacations;
    }

    @Override
    public List<Vacation> getVacationsByUser(Long userId) {
        List<Vacation> vacations = getAllVacations();

        return vacations.stream()
                .filter(v -> v.getUser() != null && userId.equals(v.getUser().getId()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Vacation assignUserToVacation(Long vacationId, Long userId) {
        Vacation vacation = new Vacation();
        User user = new User();

        if (vacationId != null) {
            vacation = vacationRepository.findByIdWithDetails(vacationId);
        }
        if(userId!=null){
            user = userRepository.findById(userId).orElse(null);
        }
        if (user == null || vacation == null) {
            throw new RuntimeException("User or Vacation not found");
        }
        vacation.setUser(user);
        vacation.setUsed(true);
        Vacation savedVacation = vacationRepository.saveAndFlush(vacation);
        sendConfirmationEmail(vacation, user);

        return savedVacation;
    }

    @Override
    public List<Vacation> getVacationsByCity(String city) {
        return vacationRepository.findByHotelCity(city);
    }

    @Override
    public List<VacationDTO> findByFromAndToAndCheckinAndCheckoutAndNoOfPassengers(String from, String to, String checkin, String checkout, int noOfPassengers) {
        List<Vacation> vacations = vacationRepository.findByFromAndToAndCheckinAndCheckoutAndNoOfPassengers(
                from, to, checkin, checkout, noOfPassengers);

        List<VacationDTO> dtoList = new ArrayList<>();
        if (vacations.size() > 0) {
            for (Vacation vacation : vacations) {
                dtoList.add(VacationMapper.toDTO(vacation));
            }
        }
        return dtoList;
    }

    @Override
    public List<Vacation> getVacationsByUserId(Long userId) {
        return vacationRepository.findByUserIdFetchDetails(userId);
    }

    @Override
    public VacationDTO cancelAVacation(Long vacationId) {
        Vacation vacation = vacationRepository.findById(vacationId)
                .orElseThrow(() -> new RuntimeException("Vacation not found"));

        // set 'used' to false for vacation, hotel, and flight
        vacation.setUsed(false);
        if (vacation.getHotel() != null) {
            vacation.getHotel().setUsed(false);
        }
        if (vacation.getFlight() != null) {
            vacation.getFlight().setUsed(false);
        }

        if ("Created by user".equals(vacation.getType())) {
            vacationRepository.delete(vacation);
            return null; // Return null if vacation is deleted
        } else {
            vacation.setUser(null); // Disassociate the user from the vacation
            Vacation updatedVacation = vacationRepository.saveAndFlush(vacation);
            return VacationMapper.toDTO(updatedVacation); // Convert to DTO and return
        }
    }

    private double parsePrice(String price) {
        if (price != null && !price.isEmpty()) {
            price = price.replace("€", "").trim(); // Remove the euro symbol and trim whitespace
            try {
                return Double.parseDouble(price); // Directly parse the price string as double
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
        }
        return 0.0;
    }

    public void sendConfirmationEmail(Vacation vacation, User user) {
        Hotel hotel = vacation.getHotel();
        Flight flight = vacation.getFlight();
        String subject = "Your Vacation Package Booking Confirmation and Payment Details";
        String text = String.format("Hi,\n\n" +
                        "We are pleased to confirm your vacation package booking. Here are the details of your reservation:\n\n" +
                        "Vacation Package Details:\n" +
                        "- Title: %s\n" +
                        "- Number of Passengers: %d\n" +
                        "- Total Price: %s\n\n" +
                        "Hotel Details:\n" +
                        "- Name: %s\n" +
                        "- Address: %s\n" +
                        "- Check-in: %s\n" +
                        "- Check-out: %s\n" +
                        "- Number of Rooms: %d\n" +
                        "- Number of Adults: %d\n\n" +
                        "Flight Details:\n" +
                        "- Flight Number: %s\n" +
                        "- Departure: %s\n" +
                        "- Arrival: %s\n" +
                        "- Booking Reference: %s\n\n" +
                        "To complete your booking, please proceed with the payment of %s to the following bank account. Kindly ensure the payment is made at least one month before your check-in date.\n\n" +
                        "Bank Account Details:\n" +
                        "- Bank Name: BRD\n" +
                        "- Account Name: Lamba Emilia Alexandra\n" +
                        "- Account Number: 123456789012\n" +
                        "- IBAN: GB33BUKB20201555555555\n" +
                        "Please include your booking reference number in the payment details for processing.\n\n" +
                        "We appreciate your prompt attention to this matter. Should you have any questions or need further assistance, please do not hesitate to contact our customer service team at this email.\n\n" +
                        "Thank you for choosing E-Travel. We look forward to serving you.\n\n" +
                        "Best regards,\n" +
                        "E-Travel Team",
                vacation.getTitle(), vacation.getNoOfPassengers(),
                vacation.getTotalPrice(), hotel.getName(), hotel.getAddress(), hotel.getCheckin(), hotel.getCheckout(),
                hotel.getRooms(), hotel.getAdults(), flight.getFlightNumberDepart(), flight.getDepartureOrigin(),
                flight.getDepartureDestination(), flight.getFlight_id(), vacation.getTotalPrice());

        emailSender.sendEmail(user.getEmail(), subject, text);
    }

}
