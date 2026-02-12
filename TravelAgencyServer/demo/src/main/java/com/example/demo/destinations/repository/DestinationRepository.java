package com.example.demo.destinations.repository;

import com.example.demo.destinations.model.Destination;
import com.example.demo.hotels.model.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
    Page<Destination> findAll(Pageable pageable);
    Page<Destination> findByVisibleTrue(Pageable pageable);

    Destination findByEntityId(String entityId);
    Destination findByCity(String city);

    @Query("SELECT d FROM Destination d WHERE d.country = 'Romania' AND d.showInDashboard = true")
    List<Destination> findAllRomanianDestinationsForDashboard();

    @Query("SELECT d FROM Destination d WHERE d.country != 'Romania' AND d.showInDashboard = true")
    List<Destination> getWorldsPopularDestinations();
}

