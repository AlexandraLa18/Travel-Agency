package com.example.demo.vacations.controller;

import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.models.SimpleVacationRequest;
import com.example.demo.shared.models.VacationRequest;
import com.example.demo.shared.models.VacationSearchResponseDTO;
import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.simpleVacation.model.SimpleVacationDTO;
import com.example.demo.vacations.model.Vacation;
import com.example.demo.vacations.model.VacationDTO;
import com.example.demo.vacations.service.VacationServiceIF;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@RestController
@RequestMapping("/vacations")
public class VacationController {
    private VacationServiceIF vacationServiceIF;

    public VacationController(VacationServiceIF vacationServiceIF) {
        this.vacationServiceIF = vacationServiceIF;
    }
    @PostMapping
    public ResponseEntity<Vacation> createVacation(@RequestBody Vacation vacation) {
        return new ResponseEntity<>(vacationServiceIF.createVacation(vacation), HttpStatus.OK);
    }

    @PostMapping("/byUser")
    public ResponseEntity<Vacation> createVacationByUser(@RequestBody VacationRequest request) {
        return new ResponseEntity<>(vacationServiceIF.createVacationByUser(request.getHotel(), request.getFlight(), request.getUserId()), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Vacation>> getAllVacations() {
        List<Vacation> list = vacationServiceIF.getAllVacations();
        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Vacation> getVacationById(@PathVariable Long id) {
        return vacationServiceIF.getVacationById(id)
                .map(Vacation -> new ResponseEntity<>(Vacation, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));    }

    @PostMapping("/loadVacationsBySearchReq")
    public ResponseEntity<VacationSearchResponseDTO> loadVacationsBySearchReq(@RequestBody SearchRequestDTO searchRequest) throws ValidationException {
        return new ResponseEntity<>(vacationServiceIF.loadVacationsBySearchReq(searchRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVacationById(@PathVariable Long id) {
        return vacationServiceIF.deleteVacationById(id);
    }

    @GetMapping("/forUserId/{userId}")
    public List<Vacation> getUserVacations(@PathVariable Long userId) {
        return vacationServiceIF.getVacationsByUser(userId);
    }
    @GetMapping("/byCity")
    public List<Vacation> getVacationsByCity(@RequestParam String city) {
        return vacationServiceIF.getVacationsByCity(city);
    }
    @GetMapping("/findByCityAndCheckinAndCheckoutAndNoOfPassengers")
    public ResponseEntity<List<VacationDTO>> findByFromAndToAndCheckinAndCheckoutAndNoOfPassengers(@RequestParam String from,
                                                                                                   @RequestParam String to,
                                                                                                    @RequestParam String checkin,
                                                                                                    @RequestParam String checkout,
                                                                                                    @RequestParam int noOfPassengers) {

        List<VacationDTO> vacations = vacationServiceIF.findByFromAndToAndCheckinAndCheckoutAndNoOfPassengers(
                from, to, checkin, checkout, noOfPassengers);

        return ResponseEntity.ok(vacations);
    }

    @PutMapping("/{vacationId}/user/{userId}")
    public ResponseEntity<Vacation> assignUserToVacation(@PathVariable Long vacationId, @PathVariable Long userId) {
        Vacation vacation = vacationServiceIF.assignUserToVacation(vacationId, userId);
        return ResponseEntity.ok(vacation);
    }

    @GetMapping("/vacationsListOfUser/{userId}")
    public ResponseEntity<List<Vacation>> getVacationsByUserId(@PathVariable Long userId) {
        List<Vacation> vacations = vacationServiceIF.getVacationsByUserId(userId);
        return ResponseEntity.ok(vacations);
    }

    @DeleteMapping("/cancel/{vacationId}")
    @Transactional
    public ResponseEntity<?> cancelAVacation(@PathVariable Long vacationId) {
        try {
            VacationDTO vacation = vacationServiceIF.cancelAVacation(vacationId);
            if (vacation == null) {
                return ResponseEntity.ok().build(); // No content to return, vacation was deleted
            } else {
                return ResponseEntity.ok(vacation); // Return the updated vacation
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
