package com.example.demo.destinations.controller;

import com.example.demo.destinations.model.Destination;
import com.example.demo.destinations.service.DestinationServiceIF;
import com.example.demo.shared.models.DestinationSearchResponseDTO;
import com.example.demo.shared.models.HotelSearchResponseDTO;
import com.example.demo.shared.models.SearchRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@RestController
@RequestMapping("/destinations")
public class DestinationController {
    private DestinationServiceIF destinationServiceIF;

    public DestinationController(DestinationServiceIF destinationServiceIF) {
        this.destinationServiceIF = destinationServiceIF;
    }

    @PostMapping
    public ResponseEntity<Destination> createDestination(@RequestBody Destination destination) {
        return new ResponseEntity<>(destinationServiceIF.createDestination(destination), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Destination>> getAllDestinations() {
        List<Destination> destinationList = destinationServiceIF.getAllDestinations();
        if (destinationList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(destinationList, HttpStatus.OK);
    }

    @GetMapping("/romania")
    public ResponseEntity<List<Destination>> getAllRomaniaDestinations() {
        List<Destination> list = destinationServiceIF.getAllRomaniaDestinations();
        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);

    }

    @GetMapping("/worldsPopular")
    public ResponseEntity<List<Destination>> getWorldsPopularDestinations() {
        List<Destination> list = destinationServiceIF.getWorldsPopularDestinations();
        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        return destinationServiceIF.getDestinationById(id)
                .map(destinationDTO -> new ResponseEntity<>(destinationDTO, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PostMapping("/loadDestinationsBySearchReq")
    public ResponseEntity<DestinationSearchResponseDTO> loadDestinationsBySearchReq(@RequestBody SearchRequestDTO searchRequest) throws ValidationException {
        return new ResponseEntity<>(destinationServiceIF.loadDestinationsBySearchReq(searchRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDestinationById(@PathVariable Long id) {
        return destinationServiceIF.deleteDestinationById(id);
    }

    @GetMapping("/byName/{name}")
    public ResponseEntity<List<Destination>> getApiDestinationsByName(@PathVariable String name)  throws ValidationException {
        return new ResponseEntity<>(destinationServiceIF.requestApiDestinations(name), HttpStatus.OK);
    }
}
