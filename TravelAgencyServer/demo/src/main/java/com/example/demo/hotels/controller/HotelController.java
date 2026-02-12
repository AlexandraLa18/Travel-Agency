package com.example.demo.hotels.controller;

import com.example.demo.destinations.service.DestinationServiceIF;
import com.example.demo.flights.model.Flight;
import com.example.demo.hotels.model.Hotel;
import com.example.demo.hotels.model.HotelDTO;
import com.example.demo.hotels.repository.HotelRepository;
import com.example.demo.hotels.service.HotelServiceIF;
import com.example.demo.shared.models.HotelSearchResponseDTO;
import com.example.demo.shared.models.SearchRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@RestController
@RequestMapping("/hotels")
public class HotelController {
    private HotelServiceIF hotelServiceIF;
    private DestinationServiceIF destinationServiceIF;
    private HotelRepository hotelRepository;

    public HotelController(HotelServiceIF hotelServiceIF, DestinationServiceIF destinationServiceIF, HotelRepository hotelRepository) {
        this.hotelServiceIF = hotelServiceIF;
        this.destinationServiceIF = destinationServiceIF;
        this.hotelRepository = hotelRepository;
    }
    @PostMapping
    public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotelDTO) {
        return new ResponseEntity<>(hotelServiceIF.createHotel(hotelDTO), HttpStatus.OK);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Hotel> createHotelAndAssignUser(@PathVariable Long userId, @RequestBody Hotel hotel) {
        return new ResponseEntity<>(hotelServiceIF.createHotelAndAssignUser(hotel, userId), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Hotel>> getAllHotels() {
        List<Hotel> hotelDTOList = hotelServiceIF.getAllHotels();
        if (hotelDTOList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(hotelDTOList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        return hotelServiceIF.getHotelById(id)
                .map(hotelDTO -> new ResponseEntity<>(hotelDTO, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));    }

    @PostMapping("/loadHotelsBySearchReq")
    public ResponseEntity<HotelSearchResponseDTO> loadHotelsBySearchReq(@RequestBody SearchRequestDTO searchRequest) throws ValidationException {
        return new ResponseEntity<>(hotelServiceIF.loadHotelsBySearchReq(searchRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHotelById(@PathVariable Long id) {
        return hotelServiceIF.deleteHotelById(id);
    }

    @GetMapping("/api/{destinationEntityID}/{checkin}/{checkout}/{rooms}/{adults}/{resultsPErPAge}/{page}")
    public ResponseEntity<List<Hotel>> getApiHotels(@PathVariable String destinationEntityID, @PathVariable String checkin, @PathVariable String checkout, @PathVariable int rooms, @PathVariable int adults, @PathVariable int resultsPErPAge, @PathVariable int page)   throws ValidationException {
        return new ResponseEntity<>(hotelServiceIF.requestApiHotels( destinationEntityID, checkin, checkout, rooms, adults, resultsPErPAge, page), HttpStatus.OK);
    }

    @GetMapping("/api/city/{destinationCity}/{checkin}/{checkout}/{rooms}/{adults}/{resultsPErPAge}/{page}")
    public ResponseEntity<List<Hotel>> getApiHotelsByCity(@PathVariable String destinationCity, @PathVariable String checkin, @PathVariable String checkout, @PathVariable int rooms, @PathVariable int adults, @PathVariable int resultsPErPAge, @PathVariable int page)   throws ValidationException {
        return new ResponseEntity<>(hotelServiceIF.requestApiHotelsByCity(destinationCity, checkin, checkout, rooms, adults, resultsPErPAge, page), HttpStatus.OK);
    }

    @PostMapping("/addApiHotel/{destinationEntityId}")
    public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel, @PathVariable String destinationEntityId) {
        return new ResponseEntity<>(hotelServiceIF.createApiHotel(hotel, destinationEntityId), HttpStatus.OK);
    }
    @GetMapping("/getHotelsByDestinationAndDates")
    public ResponseEntity<List<Hotel>> getHotelsByDestinationAndDates(
            @RequestParam Long destinationId,
            @RequestParam String checkin,
            @RequestParam String checkout,
            @RequestParam int noOfPassengers) {

        List<Hotel> hotels = hotelServiceIF.getHotelsByDestinationAndDates(destinationId, checkin, checkout, noOfPassengers);
        if (hotels.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(hotels);
    }

    @GetMapping("/hotelsListOfUser/{userId}")
    public ResponseEntity<List<Hotel>> getHotelsByUserId(@PathVariable Long userId) {
        List<Hotel> hotels = hotelServiceIF.getHotelsByUserId(userId);
        return ResponseEntity.ok(hotels);
    }

    @PutMapping("/cancel/{hotelId}")
    public ResponseEntity<HotelDTO> cancelHotelBooking(@PathVariable Long hotelId) {
        HotelDTO hotelDTO = hotelServiceIF.cancelHotelBooking(hotelId);
        if (hotelDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(hotelDTO);
    }
}
