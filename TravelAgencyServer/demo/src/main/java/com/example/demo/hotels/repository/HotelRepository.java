package com.example.demo.hotels.repository;
import com.example.demo.flights.model.Flight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.hotels.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    @Query("SELECT h FROM Hotel h JOIN FETCH h.destination")
    List<Hotel> findAllWithDestinationFetched();
    Hotel findByEntityId(String entityId);
    Page<Hotel> findAll(Pageable pageable);
    Page<Hotel> findByUsedFalse(Pageable pageable);

    @Query("SELECT h FROM Hotel h " +
            "JOIN FETCH h.destination " +
            "JOIN FETCH h.user u " +
            "WHERE u.id = :userId AND h.used = true")
    List<Hotel> findByUserIdFetchDetails(@Param("userId") Long userId);
}
