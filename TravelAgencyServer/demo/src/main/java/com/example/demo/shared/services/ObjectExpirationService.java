package com.example.demo.shared.services;

import com.example.demo.flights.model.Flight;
import com.example.demo.flights.repository.FlightRepository;
import com.example.demo.hotels.model.Hotel;
import com.example.demo.hotels.repository.HotelRepository;
import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.simpleVacation.repo.SimpleVacationRepository;
import com.example.demo.user.model.User;
import com.example.demo.vacations.model.Vacation;
import com.example.demo.vacations.repo.VacationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ObjectExpirationService {
    @Autowired
    private VacationRepository vacationRepository;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private SimpleVacationRepository simpleVacationRepository;
    @Autowired
    private EmailSender emailSender;

    //    @Scheduled(cron = "0 0 0 * * ?")// Runs every 24 hours at 00:00 (midnight)
    @Scheduled(fixedRate = 300000) // Runs every 5 minutes
    public void checkForExpiredVacations() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        List<Vacation> vacations = vacationRepository.findAll();

        for (Vacation vacation : vacations) {
            Flight flight = vacation.getFlight();
            Hotel hotel = vacation.getHotel();
            if (flight != null) {
                LocalDateTime departureDateTime = LocalDateTime.parse(flight.getDepartureOrigin(), formatter);
                if (departureDateTime.isBefore(now)) {
                    System.out.println("Expired vacation found: " + vacation.getVacation_id());
                    vacationRepository.delete(vacation);
                    if (flight != null) {
                        flightRepository.delete(vacation.getFlight());
                    }
                    if (hotel != null) {
                        hotelRepository.delete(vacation.getHotel());
                    }
                }
            }
        }
    }

    //    @Scheduled(cron = "0 0 0 * * ?")// Runs every 24 hours at 00:00 (midnight)
    @Scheduled(fixedRate = 300000) // Runs every 5 minutes
    public void checkForExpiredSimpleVacations() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        List<SimpleVacation> vacations = simpleVacationRepository.findAllWithHotelDestinationFetched();

        for (SimpleVacation vacation : vacations) {
            Hotel hotel = vacation.getHotel();
            if (hotel != null) {
                LocalDateTime departureDateTime = LocalDateTime.parse(hotel.getCheckin() + "T00:00:00", formatter);
                if (departureDateTime.isBefore(now)) {
                    System.out.println("Expired simple vacation found: " + vacation.getSimpleVacation_id());
                    simpleVacationRepository.delete(vacation);
                    if (hotel != null) {
                        hotelRepository.delete(vacation.getHotel());
                    }
                }
            }
        }
    }

    //    @Scheduled(cron = "0 0 0 * * ?")// Runs every 24 hours at 00:00 (midnight)
    @Scheduled(fixedRate = 300000) // Runs every 5 minutes
    public void checkForExpiredHotelBookings() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        List<Hotel> hotels = hotelRepository.findAll();

        for (Hotel hotel : hotels) {
            LocalDateTime departureDateTime = LocalDateTime.parse(hotel.getCheckin()+ "T00:00:00", formatter);
            if (departureDateTime.isBefore(now)) {
                System.out.println("Expired simple vacation found: " + hotel.getId());
                hotelRepository.delete(hotel);
            }

        }
    }

    //    @Scheduled(cron = "0 0 0 * * ?")// Runs every 24 hours at 00:00 (midnight)
    @Scheduled(fixedRate = 300000) // Runs every 5 minutes
    public void checkForExpiredFlightBookings() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        List<Flight> flights = flightRepository.findAll();

        for (Flight flight : flights) {
            LocalDateTime departureDateTime = LocalDateTime.parse(flight.getDepartureOrigin(), formatter);
            if (departureDateTime.isBefore(now)) {
                System.out.println("Expired simple vacation found: " + flight.getFlight_id());
                flightRepository.delete(flight);
            }

        }
    }

//    @Scheduled(cron = "0 0 0 * * ?") // Runs every day at 12:00 AM
    @Scheduled(fixedRate = 30000)
    @Transactional
    public void sendReminderEmails() {
        LocalDate twoDaysFromNow = LocalDate.now().plusDays(2);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<Vacation> vacations = vacationRepository.findAll();
        for (Vacation vacation : vacations) {
            if (vacation.getHotel() != null) {
                LocalDate checkinDate = LocalDate.parse(vacation.getHotel().getCheckin(), formatter);
                if (checkinDate.isEqual(twoDaysFromNow)) {
                    User user = vacation.getUser();
                    if (user != null) {
//                        String email = "lambaalexandra1804@yahoo.com";
                        String email = user.getEmail();
                        String subject = "Your Vacation is Coming Up!";
                        String text = String.format("Hi,\n\nThis is a reminder that your vacation is scheduled to start on %s. Please make sure to prepare accordingly.\n\nBest regards,\nE-Travel Team", vacation.getHotel().getCheckin());
                        emailSender.sendEmail(email, subject, text);
                    }
                }
            }
        }

        // Fetch all simple vacations and filter by check-in date
        List<SimpleVacation> simpleVacations = simpleVacationRepository.findAllWithHotelDestinationFetched();
        for (SimpleVacation simpleVacation : simpleVacations) {
            if (simpleVacation.getHotel() != null) {
                LocalDate checkinDate = LocalDate.parse(simpleVacation.getHotel().getCheckin(), formatter);
                if (checkinDate.isEqual(twoDaysFromNow)) {
                    User user = simpleVacation.getUser();
                    if (user != null) {
//                        String email = "lambaalexandra1804@yahoo.com";
                        String email = user.getEmail();
                        String subject = "Your Vacation is Coming Up!";
                        String text = String.format("Hi,\n\nThis is a reminder that your vacation is scheduled to start on %s. Please make sure to prepare accordingly.\n\nBest regards,\nE-Travel Team", simpleVacation.getHotel().getCheckin());
                        emailSender.sendEmail(email, subject, text);
                    }
                }
            }
        }
    }
}

