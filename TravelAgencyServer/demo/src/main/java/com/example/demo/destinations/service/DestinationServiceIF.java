package com.example.demo.destinations.service;
import com.example.demo.destinations.model.Destination;
import com.example.demo.shared.models.DestinationSearchResponseDTO;
import com.example.demo.shared.models.SearchRequestDTO;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

public interface DestinationServiceIF {
    Destination createDestination(Destination destination);
    List<Destination> getAllDestinations();
    List<Destination> getAllRomaniaDestinations();
    List<Destination> getWorldsPopularDestinations();
    Optional<Destination> getDestinationById(Long id);
    DestinationSearchResponseDTO loadDestinationsBySearchReq(SearchRequestDTO searchRequest);
    ResponseEntity<?> deleteDestinationById(Long id);
    List<Destination> requestApiDestinations(String name);

}
