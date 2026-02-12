package com.example.demo.vacations.repo;

import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.vacations.model.Vacation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VacationRepository extends JpaRepository<Vacation, Long> {
    Page<Vacation> findAll(Pageable pageable);

    @Query("SELECT v FROM Vacation v JOIN FETCH v.flight f JOIN FETCH f.fromDestination JOIN FETCH f.toDestination JOIN FETCH v.hotel h JOIN FETCH h.destination LEFT JOIN FETCH v.user u")
    List<Vacation> findAllWithFlightDestinationsAndHotelFetched();

    @Query("SELECT v FROM Vacation v JOIN FETCH v.flight f JOIN FETCH f.fromDestination JOIN FETCH f.toDestination JOIN FETCH v.hotel h JOIN FETCH h.destination LEFT JOIN FETCH v.user u WHERE v.vacation_id = :vacationId")
    Vacation findByIdWithDetails(Long vacationId);

    @Query("SELECT v FROM Vacation v JOIN FETCH v.flight f JOIN FETCH f.fromDestination JOIN FETCH f.toDestination JOIN FETCH v.hotel h JOIN FETCH h.destination d LEFT JOIN FETCH v.user WHERE d.city = :city AND v.isUsed = false")
    List<Vacation> findByHotelCity(String city);

    @Query("SELECT v FROM Vacation v JOIN FETCH v.flight f JOIN FETCH f.fromDestination fromDest JOIN FETCH f.toDestination toDest " +
            "JOIN v.hotel h JOIN h.destination d " +
            "LEFT JOIN FETCH v.user u " +
            "WHERE fromDest.city = :from AND toDest.city = :to AND h.checkin = :checkin AND h.checkout = :checkout " +
            "AND v.noOfPassengers = :noOfPassengers " +
            "AND v.isUsed = false")
    List<Vacation> findByFromAndToAndCheckinAndCheckoutAndNoOfPassengers(
            @Param("from") String from,
            @Param("to") String to,
            @Param("checkin") String checkin,
            @Param("checkout") String checkout,
            @Param("noOfPassengers") int noOfPassengers);

    @Query("SELECT v FROM Vacation v " +
            "JOIN FETCH v.flight f " +
            "JOIN FETCH f.fromDestination fromDest " +
            "JOIN FETCH f.toDestination toDest " +
            "JOIN FETCH v.hotel h " +
            "JOIN FETCH h.destination d " +
            "JOIN FETCH v.user u " +
            "WHERE u.id = :userId AND v.isUsed = true")
    List<Vacation> findByUserIdFetchDetails(@Param("userId") Long userId);
}

