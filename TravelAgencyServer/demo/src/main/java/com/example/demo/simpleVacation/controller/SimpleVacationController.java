package com.example.demo.simpleVacation.controller;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.models.SimpleVacationSearchResponseDTO;
import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.simpleVacation.model.SimpleVacationDTO;
import com.example.demo.simpleVacation.service.SimpleVacationServiceIF;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@RestController
@RequestMapping("/simplevacations")
public class SimpleVacationController {
    private SimpleVacationServiceIF vacationServiceIF;

    public SimpleVacationController(SimpleVacationServiceIF vacationServiceIF) {
        this.vacationServiceIF = vacationServiceIF;
    }

    @PostMapping
    public ResponseEntity<SimpleVacation> createSimpleVacation(@RequestBody SimpleVacation vacation) {
        return new ResponseEntity<>(vacationServiceIF.createSimpleVacation(vacation), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<SimpleVacation>> getAllSimpleVacations() {
        List<SimpleVacation> list = vacationServiceIF.getAllSimpleVacations();
        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);

    }

    @GetMapping("/romania")
    public ResponseEntity<List<SimpleVacation>> getAllRomaniaVacations() {
        List<SimpleVacation> list = vacationServiceIF.getAllRomaniaVacations();
        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/byCity")
    public List<SimpleVacation> getVacationsByCity(@RequestParam String city) {
        return vacationServiceIF.getVacationsByCity(city);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SimpleVacation> getVacationById(@PathVariable Long id) {
        return vacationServiceIF.getSimpleVacationById(id)
                .map(Vacation -> new ResponseEntity<>(Vacation, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/loadSimpleVacationsBySearchReq")
    public ResponseEntity<SimpleVacationSearchResponseDTO> loadSimpleVacationsBySearchReq(@RequestBody SearchRequestDTO searchRequest) throws ValidationException {
        return new ResponseEntity<>(vacationServiceIF.loadSimpleVacationsBySearchReq(searchRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSimpleVacationById(@PathVariable Long id) {
        return vacationServiceIF.deleteSimpleVacationById(id);
    }

    @GetMapping("/forUserId/{userId}")
    public List<SimpleVacation> getUserSimpleVacations(@PathVariable Long userId) {
        return vacationServiceIF.getSimpleVacationsByUser(userId);
    }

    @PutMapping("/{simpleVacationId}/user/{userId}")
    public ResponseEntity<SimpleVacation> assignUserToSimpleVacation(@PathVariable Long simpleVacationId, @PathVariable Long userId) {
        SimpleVacation vacation = vacationServiceIF.assignUserToSimpleVacation(simpleVacationId, userId);
        return ResponseEntity.ok(vacation);
    }

    @GetMapping("/findByCityAndCheckinAndCheckoutAndNoOfPassengers")
    public ResponseEntity<List<SimpleVacationDTO>> findByCityAndCheckinAndCheckoutAndNoOfPassengers(@RequestParam String city,
                                                                                                    @RequestParam String checkin,
                                                                                                    @RequestParam String checkout,
                                                                                                    @RequestParam int noOfPassengers) {

        List<SimpleVacationDTO> vacations = vacationServiceIF.findByCityAndCheckinAndCheckoutAndNoOfPassengers(
                city, checkin, checkout, noOfPassengers);

        return ResponseEntity.ok(vacations);
    }

    @GetMapping("/simpleVacationsListOfUser/{userId}")
    public ResponseEntity<List<SimpleVacationDTO>> getSimpleVacationsByUserId(@PathVariable Long userId) {
        List<SimpleVacationDTO> vacations = vacationServiceIF.getSimpleVacationsByUserId(userId);
        return ResponseEntity.ok(vacations);
    }

    @DeleteMapping("/cancel/{vacationId}")
    @Transactional
    public ResponseEntity<?> cancelAVacation(@PathVariable Long vacationId) {
        try {
            SimpleVacationDTO vacation = vacationServiceIF.cancelAVacation(vacationId);
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
