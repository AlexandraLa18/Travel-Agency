package com.example.demo.hotels.service.impl;

import com.example.demo.destinations.model.Destination;
import com.example.demo.destinations.repository.DestinationRepository;
import com.example.demo.hotels.mapper.HotelMapper;
import com.example.demo.hotels.model.Hotel;
import com.example.demo.hotels.model.HotelDTO;
import com.example.demo.hotels.repository.HotelRepository;
import com.example.demo.hotels.service.HotelServiceIF;
import com.example.demo.shared.models.HotelSearchResponseDTO;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.services.EmailSender;
import com.example.demo.shared.services.HotelApiService;
import com.example.demo.user.model.User;
import com.example.demo.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HotelServiceImpl implements HotelServiceIF {
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private DestinationRepository destinationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailSender emailSender;

    HotelApiService service = new HotelApiService();

    public HotelServiceImpl(HotelRepository hotelRepository, DestinationRepository destinationRepository, UserRepository userRepository, EmailSender emailSender) {
        this.hotelRepository = hotelRepository;
        this.destinationRepository = destinationRepository;
        this.userRepository = userRepository;
        this.emailSender = emailSender;
    }

    @Override
    public Hotel createHotel(Hotel hotelDTO) {
        return hotelRepository.saveAndFlush(hotelDTO);
    }

    @Override
    public Hotel createHotelAndAssignUser(Hotel hotel, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("Invalid user ID: " + userId)
        );
        hotel.setUser(user);
        hotel.setUsed(true);
        Hotel savedHotel = hotelRepository.save(hotel);
        sendConfirmationEmail(hotel,user);
        return savedHotel;
    }

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAllWithDestinationFetched();
    }

    @Override
    public Optional<Hotel> getHotelById(Long id) {
        return hotelRepository.findById(id);
    }

    @Override
    public HotelSearchResponseDTO loadHotelsBySearchReq(SearchRequestDTO searchRequest) {
        Pageable pageable = PageRequest.of(
                searchRequest.getPaginationDTO().getPage(),
                searchRequest.getPaginationDTO().getPageSize()
        );

        Page<Hotel> hotelPage = hotelRepository.findByUsedFalse(pageable);
        Page<HotelDTO> dtoPage = hotelPage.map(HotelMapper::toDTO);

        final HotelSearchResponseDTO responseDTO = new HotelSearchResponseDTO();
        responseDTO.setResults(dtoPage.getContent());
        responseDTO.setTotal(dtoPage.getTotalElements());

        return responseDTO;
    }

    @Override
    public ResponseEntity<?> deleteHotelById(Long id) {
        if (hotelRepository.existsById(id)) {
            hotelRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<Hotel> requestApiHotels(String destinationEntityID, String checkin, String checkout, int rooms, int adults, int resultsPErPAge, int page) {
        Destination destination = destinationRepository.findByEntityId(destinationEntityID);
        List<Hotel> hotels = service.getHotelsFromApi(destination, checkin, checkout, rooms, adults, resultsPErPAge, page);
        return hotels;
    }

    @Override
    public List<Hotel> requestApiHotelsByCity(String destinationCity, String checkin, String checkout, int rooms, int adults, int resultsPErPAge, int page) {
        String destinationEntityID = destinationRepository.findByCity(destinationCity).getEntityId();
        Destination destination = destinationRepository.findByEntityId(destinationEntityID);
        List<Hotel> hotels = service.getHotelsFromApi(destination, checkin, checkout, rooms, adults, resultsPErPAge, page);
        return hotels;
    }
    @Override
    public Hotel createApiHotel(Hotel oldHotel, String destinationEntityId) {
        Destination destination = destinationRepository.findByEntityId(destinationEntityId);
        if (destination == null) {
            throw new IllegalArgumentException("Destination not found for Entity ID: " + destinationEntityId);
        }
        Hotel hotelDTO = service.getHotelDetailsFromApi(oldHotel, destination);
        return hotelRepository.saveAndFlush(hotelDTO);
    }

    @Override
    public List<Hotel> getHotelsByDestinationAndDates(Long destinationId, String checkin, String checkout, int noOfPassengers) {
        List<Hotel> allHotels = getAllHotels();
        return allHotels.stream()
                .filter(hotel -> hotel.getDestination().getDestination_id().equals(destinationId))
                .filter(hotel -> hotel.getCheckin().equals(checkin))
                .filter(hotel -> hotel.getCheckout().equals(checkout))
                .filter(hotel -> hotel.isUsed() == false)
                .filter(hotel -> hotel.getAdults() == noOfPassengers)
                .collect(Collectors.toList());
    }

    @Override
    public List<Hotel> getHotelsByUserId(Long userId) {
        return hotelRepository.findByUserIdFetchDetails(userId);
    }

    @Override
    public HotelDTO cancelHotelBooking(Long hotelId) {
        return hotelRepository.findById(hotelId).map(hotel -> {
            hotel.setUser(null);
            hotel.setUsed(false);
            Hotel savedHotel = hotelRepository.save(hotel);
            return HotelMapper.toDTO(savedHotel);
        }).orElse(null);
    }

    public void sendConfirmationEmail(Hotel hotel, User user) {
        String subject = "Your Hotel Booking Confirmation and Payment Details";
        String text = String.format("Hi,\n\n" +
                        "We are pleased to confirm your hotel booking at %s. Here are the details of your reservation:\n\n" +
                        "Hotel Details:\n" +
                        "- Name: %s\n" +
                        "- Address: %s\n" +
                        "- Check-in: %s\n" +
                        "- Check-out: %s\n" +
                        "- Number of Rooms: %d\n" +
                        "- Number of Adults: %d\n" +
                        "- Booking reference: %s\n\n" +
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
                hotel.getName(), hotel.getName(), hotel.getAddress(), hotel.getCheckin(), hotel.getCheckout(),
                hotel.getRooms(), hotel.getAdults(), hotel.getEntityId(), hotel.getPrice());

        emailSender.sendEmail(user.getEmail(), subject, text);
    }

}
