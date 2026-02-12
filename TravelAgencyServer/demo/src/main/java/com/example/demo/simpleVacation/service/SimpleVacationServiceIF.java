package com.example.demo.simpleVacation.service;

import com.example.demo.hotels.model.Hotel;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.models.SimpleVacationSearchResponseDTO;

import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.simpleVacation.model.SimpleVacationDTO;
import com.example.demo.vacations.model.Vacation;
import com.example.demo.vacations.model.VacationDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface SimpleVacationServiceIF {
    SimpleVacation createSimpleVacation(SimpleVacation simpleVacation);
    Optional<SimpleVacation> getSimpleVacationById(Long id);
    SimpleVacationSearchResponseDTO loadSimpleVacationsBySearchReq(SearchRequestDTO searchRequestDTO);
    ResponseEntity<?> deleteSimpleVacationById(Long id);
    List<SimpleVacation> getAllSimpleVacations();
    List<SimpleVacation> getAllRomaniaVacations();
    List<SimpleVacation> getVacationsByCity(String city);
    public List<SimpleVacation> getSimpleVacationsByUser(Long userId);
    public SimpleVacation assignUserToSimpleVacation(Long vacationId, Long userId);
    List<SimpleVacationDTO> findByCityAndCheckinAndCheckoutAndNoOfPassengers(String city,String checkin,String checkout,int noOfPassengers);
    List<SimpleVacationDTO> getSimpleVacationsByUserId(Long userId);
    SimpleVacationDTO cancelAVacation(Long vacationId);
}
