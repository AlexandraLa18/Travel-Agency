package com.example.demo.flights.repository;

import com.example.demo.flights.model.Flight;
import com.example.demo.vacations.model.Vacation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    Page<Flight> findAll(Pageable pageable);
    @Query("SELECT f FROM Flight f JOIN FETCH f.fromDestination JOIN FETCH f.toDestination")
    List<Flight> findAllWithDestinationsFetched();

    @Query("SELECT f FROM Flight f JOIN FETCH f.fromDestination JOIN FETCH f.toDestination WHERE f.flight_id = :id")
    Optional<Flight> findByIdWithDestinationsFetched(@Param("id") Long id);

    @Query("SELECT f FROM Flight f WHERE f.fromDestination.id = :fromDestinationId AND f.toDestination.id = :toDestinationId AND SUBSTRING(f.departureOrigin, 1, 10) = :departureOrigin AND SUBSTRING(f.departureDestination, 1, 10) = :departureDestination")
    List<Flight> findByFlightDetails(
            @Param("fromDestinationId") Long fromDestinationId,
            @Param("toDestinationId") Long toDestinationId,
            @Param("departureOrigin") String departureOrigin,
            @Param("departureDestination") String departureDestination);

    @Query("SELECT f FROM Flight f " +
            "JOIN FETCH f.fromDestination fd " +
            "JOIN FETCH f.toDestination td " +
            "LEFT JOIN FETCH f.user u " +
            "WHERE td.city = :city AND f.used = false")
    List<Flight> findByDestinationCity(String city);

    @Query("SELECT f FROM Flight f " +
            "JOIN FETCH f.fromDestination " +
            "JOIN FETCH f.toDestination " +
            "LEFT JOIN FETCH f.user u " +
            "WHERE f.flight_id = :flightId")
    Flight findByIdWithDetails(@Param("flightId") Long flightId);

    @Query("SELECT f FROM Flight f " +
            "JOIN FETCH f.fromDestination " +
            "JOIN FETCH f.toDestination " +
            "LEFT JOIN FETCH f.user u " +
            "WHERE u.id = :userId AND f.used = true")
    List<Flight> findByUserIdFetchDetails(@Param("userId") Long userId);
}
