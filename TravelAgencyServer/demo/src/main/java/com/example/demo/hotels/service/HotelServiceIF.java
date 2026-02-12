package com.example.demo.hotels.service;
import com.example.demo.destinations.model.Destination;
import com.example.demo.flights.model.Flight;
import com.example.demo.hotels.model.HotelDTO;
import com.example.demo.shared.models.HotelSearchResponseDTO;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.hotels.model.Hotel;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface HotelServiceIF {
    Hotel createHotel(Hotel hotelDTO);
    Hotel createHotelAndAssignUser(Hotel hotel, Long userId);
    List<Hotel> getAllHotels();
    Optional<Hotel> getHotelById(Long id);
    HotelSearchResponseDTO loadHotelsBySearchReq(SearchRequestDTO searchRequest);
    ResponseEntity<?> deleteHotelById(Long id);
    List<Hotel> requestApiHotels(String destinationEntityID, String checkin, String checkout, int rooms, int adults,int resultsPErPAge, int page);
    List<Hotel> requestApiHotelsByCity(String destinationCity, String checkin, String checkout, int rooms, int adults,int resultsPErPAge, int page);
    Hotel createApiHotel(Hotel oldHotel, String destinationEntityId);
    List<Hotel> getHotelsByDestinationAndDates(Long destinationId, String checkin, String checkout, int noOfPassengers);
    List<Hotel> getHotelsByUserId(Long userId);
    HotelDTO cancelHotelBooking(Long hotelId);

}
