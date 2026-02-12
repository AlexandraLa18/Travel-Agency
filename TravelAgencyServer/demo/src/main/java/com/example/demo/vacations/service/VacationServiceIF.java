package com.example.demo.vacations.service;

import com.example.demo.flights.model.Flight;
import com.example.demo.hotels.model.Hotel;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.models.VacationSearchResponseDTO;
import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.simpleVacation.model.SimpleVacationDTO;
import com.example.demo.vacations.model.Vacation;
import com.example.demo.vacations.model.VacationDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface VacationServiceIF {
    Vacation createVacation(Vacation vacantion);
    Vacation createVacationByUser(Hotel hotel, Flight flight, Long userId);
    Optional<Vacation> getVacationById(Long id);
    VacationSearchResponseDTO loadVacationsBySearchReq(SearchRequestDTO searchRequestDTO);
    ResponseEntity<?> deleteVacationById(Long id);
    List<Vacation> getAllVacations();
    public List<Vacation> getVacationsByUser(Long userId);
    public Vacation assignUserToVacation(Long vacationId, Long userId);
    List<Vacation> getVacationsByCity(String city);
    List<VacationDTO> findByFromAndToAndCheckinAndCheckoutAndNoOfPassengers(String from, String to, String checkin, String checkout, int noOfPassengers);
    List<Vacation> getVacationsByUserId(Long userId);
    VacationDTO cancelAVacation(Long vacationId);
}
