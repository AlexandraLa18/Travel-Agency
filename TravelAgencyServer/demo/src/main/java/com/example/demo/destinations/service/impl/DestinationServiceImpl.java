package com.example.demo.destinations.service.impl;
import com.example.demo.destinations.mapper.DestinationMapper;
import com.example.demo.destinations.model.Destination;
import com.example.demo.destinations.model.DestinationDTO;
import com.example.demo.destinations.repository.DestinationRepository;
import com.example.demo.destinations.service.DestinationServiceIF;
import com.example.demo.shared.models.DestinationSearchResponseDTO;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.services.DestinationApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DestinationServiceImpl implements DestinationServiceIF {
   @Autowired
   private DestinationRepository destinationRepository;

    public DestinationServiceImpl(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @Override
    public Destination createDestination(Destination destination) {
        destination.setVisible(true);
        Destination destination1 = destinationRepository.findByEntityId(destination.getEntityId());
        if(destination1 == null) return destinationRepository.saveAndFlush(destination);
        else return destination1;
    }

    @Override
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    @Override
    public List<Destination> getAllRomaniaDestinations() {
        return destinationRepository.findAllRomanianDestinationsForDashboard();
    }

    @Override
    public List<Destination> getWorldsPopularDestinations() {
        return destinationRepository.getWorldsPopularDestinations();
    }

    @Override
    public Optional<Destination> getDestinationById(Long id) {
        return destinationRepository.findById(id);
    }

    @Override
    public DestinationSearchResponseDTO loadDestinationsBySearchReq(SearchRequestDTO searchRequest) {
        Pageable pageable = PageRequest.of(
                searchRequest.getPaginationDTO().getPage(),
                searchRequest.getPaginationDTO().getPageSize()
        );

        Page<Destination> destinationPage = destinationRepository.findByVisibleTrue(pageable);
        Page<DestinationDTO> dtoPage = destinationPage.map(DestinationMapper::toDTO);

        final DestinationSearchResponseDTO responseDTO = new DestinationSearchResponseDTO();
        responseDTO.setResults(dtoPage.getContent());
        responseDTO.setTotal(dtoPage.getTotalElements());

        return responseDTO;
    }

    @Override
    public ResponseEntity<?> deleteDestinationById(Long id) {
        Optional<Destination> destinationOptional = destinationRepository.findById(id);

        if (destinationOptional.isPresent()) {
            Destination destination = destinationOptional.get();
            destination.setVisible(false);
            destinationRepository.save(destination);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<Destination> requestApiDestinations(String name) {
        DestinationApiService service = new DestinationApiService();
        List<Destination> destinations = service.getDestinationsFromApi(name);
        return destinations;
    }
}
