package com.example.demo.simpleVacation.service.impl;

import com.example.demo.hotels.model.Hotel;
import com.example.demo.hotels.repository.HotelRepository;
import com.example.demo.hotels.service.impl.HotelServiceImpl;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.models.SimpleVacationSearchResponseDTO;
import com.example.demo.shared.services.EmailSender;
import com.example.demo.simpleVacation.mapper.SimpleVacationMapper;
import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.simpleVacation.model.SimpleVacationDTO;
import com.example.demo.simpleVacation.repo.SimpleVacationRepository;
import com.example.demo.simpleVacation.service.SimpleVacationServiceIF;
import com.example.demo.user.model.User;
import com.example.demo.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SimpleVacationServiceImpl implements SimpleVacationServiceIF {
    @Autowired
    private SimpleVacationRepository simpleVacationRepository;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotelServiceImpl hotelService;
    @Autowired
    private EmailSender emailSender;

    public SimpleVacationServiceImpl(SimpleVacationRepository simpleVacationRepository, HotelRepository hotelRepository, UserRepository userRepository, HotelServiceImpl hotelService) {
        this.simpleVacationRepository = simpleVacationRepository;
        this.hotelRepository = hotelRepository;
        this.userRepository = userRepository;
        this.hotelService = hotelService;
    }

    @Override
    public SimpleVacation createSimpleVacation(SimpleVacation vacation) {
        if (vacation.getHotel() != null && vacation.getHotel().getId() != null) {
            Hotel hotel = hotelRepository.findById(vacation.getHotel().getId()).orElse(null);
            if (hotel != null) {
                hotel.setUsed(true);
                hotelRepository.save(hotel);
            }
            vacation.setTotalPrice(hotel.getPrice());
        }
        return simpleVacationRepository.saveAndFlush(vacation);
    }

    @Override
    public Optional<SimpleVacation> getSimpleVacationById(Long id) {
        return simpleVacationRepository.findById(id);
    }

    @Override
    public SimpleVacationSearchResponseDTO loadSimpleVacationsBySearchReq(SearchRequestDTO searchRequest) {
        int x = searchRequest.getPaginationDTO().getPage();
        int y = searchRequest.getPaginationDTO().getPageSize();

        List<SimpleVacation> all = getAllSimpleVacations();
        List<SimpleVacation> newList = new ArrayList<>();
        int i = x*y;
        int z = x*y+y;
        while(i>=0 && i < z && i < all.size()) {
            newList.add(all.get(i));
            i++;
        }
        List<SimpleVacationDTO> dtoList = new ArrayList<>();
        if(newList.size() > 0) {
            for (SimpleVacation vacation : newList) {
                dtoList.add(SimpleVacationMapper.toDTO(vacation));
            }
        }
        final SimpleVacationSearchResponseDTO responseDTO = new SimpleVacationSearchResponseDTO();
        responseDTO.setResults(dtoList);
        responseDTO.setTotal((long) all.size());

        return responseDTO;    }

    @Override
    public ResponseEntity<?> deleteSimpleVacationById(Long id) {
        if (simpleVacationRepository.existsById(id)) {
            simpleVacationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }    }

    @Override
    public List<SimpleVacation> getAllSimpleVacations() {
        return simpleVacationRepository.findAllWithHotelDestinationFetched();
    }

    @Override
    public List<SimpleVacation> getVacationsByCity(String city) {
        return simpleVacationRepository.findByHotelCity(city);
    }

    @Override
    public List<SimpleVacation> getAllRomaniaVacations() {
        return simpleVacationRepository.findAllRomanianVacations();
    }

    @Override
    public List<SimpleVacation> getSimpleVacationsByUser(Long userId) {
        List<SimpleVacation> simpleVacations = getAllSimpleVacations();

        return simpleVacations.stream()
                .filter(v -> v.getUser() != null && userId.equals(v.getUser().getId()))
                .collect(Collectors.toList());
    }

    @Override
    public SimpleVacation assignUserToSimpleVacation(Long vacationId, Long userId) {
        SimpleVacation vacation = new SimpleVacation();
        User user = new User();

        if (vacationId != null) {
            vacation = simpleVacationRepository.findByIdWithDetails(vacationId);
        }
        if(userId!=null){
            user = userRepository.findById(userId).orElse(null);
        }
        if (user == null || vacation == null) {
            throw new RuntimeException("User or Vacation not found");
        }
        vacation.setUser(user);
        vacation.setUsed(true);

        SimpleVacation savedSimpleVacation = simpleVacationRepository.saveAndFlush(vacation);
        sendConfirmationEmail(vacation,user);
        return savedSimpleVacation;
    }

    @Override
    public List<SimpleVacationDTO> findByCityAndCheckinAndCheckoutAndNoOfPassengers(String city, String checkin, String checkout, int noOfPassengers) {
        List<SimpleVacation> vacations = simpleVacationRepository.findByCityAndCheckinAndCheckoutAndNoOfPassengers(
                city, checkin, checkout, noOfPassengers);

        List<SimpleVacationDTO> dtoList = new ArrayList<>();
        if (vacations.size() > 0) {
            for (SimpleVacation vacation : vacations) {
                dtoList.add(SimpleVacationMapper.toDTO(vacation));
            }
        }
        return dtoList;
    }

    @Override
    public List<SimpleVacationDTO> getSimpleVacationsByUserId(Long userId) {
        List<SimpleVacation> vacations = simpleVacationRepository.findByUserIdFetchDetails(userId);

        List<SimpleVacationDTO> dtoList = new ArrayList<>();
        if (vacations.size() > 0) {
            for (SimpleVacation vacation : vacations) {
                dtoList.add(SimpleVacationMapper.toDTO(vacation));
            }
        }
        return dtoList;
    }

    @Override
    public SimpleVacationDTO cancelAVacation(Long vacationId) {
        SimpleVacation vacation = simpleVacationRepository.findById(vacationId)
                .orElseThrow(() -> new RuntimeException("Vacation not found"));

        // Set used to false for vacation and associated hotel regardless of type
        vacation.setUsed(false);
        if (vacation.getHotel() != null) {
            vacation.getHotel().setUsed(false);
        }
        simpleVacationRepository.save(vacation); // Save the changes

        if ("Created by user".equals(vacation.getType())) {
            simpleVacationRepository.delete(vacation);
            return null;
        } else {
            vacation.setUser(null);
            SimpleVacation updatedVacation = simpleVacationRepository.saveAndFlush(vacation);
            return SimpleVacationMapper.toDTO(updatedVacation);
        }
    }

    public void sendConfirmationEmail(SimpleVacation simpleVacation, User user) {
        Hotel hotel = simpleVacation.getHotel();
        String subject = "Your Vacation Package Booking Confirmation and Payment Details";
        String text = String.format("Hi,\n\n" +
                        "We are pleased to confirm your vacation package booking. Here are the details of your reservation:\n\n" +
                        "Vacation Package Details:\n" +
                        "- Title: %s\n" +
                        "- Number of Passengers: %d\n" +
                        "- Total Price: %s\n\n" +
                        "- Booking reference: %s\n\n" +
                        "Hotel Details:\n" +
                        "- Name: %s\n" +
                        "- Address: %s\n" +
                        "- Check-in: %s\n" +
                        "- Check-out: %s\n" +
                        "- Number of Rooms: %d\n" +
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
                simpleVacation.getTitle(), simpleVacation.getNoOfPassengers(),
                simpleVacation.getTotalPrice(), simpleVacation.getSimpleVacation_id(), hotel.getName(), hotel.getAddress(), hotel.getCheckin(), hotel.getCheckout(),
                hotel.getRooms(), simpleVacation.getTotalPrice());

        emailSender.sendEmail(user.getEmail(), subject, text);
    }

}
