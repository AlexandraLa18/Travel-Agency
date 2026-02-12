package com.example.demo.simpleVacation.repo;

import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.vacations.model.Vacation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SimpleVacationRepository extends JpaRepository<SimpleVacation, Long> {
    Page<SimpleVacation> findAll(Pageable pageable);

    @Query("SELECT v FROM SimpleVacation v JOIN FETCH v.hotel h JOIN FETCH h.destination LEFT JOIN FETCH v.user")
    List<SimpleVacation> findAllWithHotelDestinationFetched();

    @Query("SELECT v FROM SimpleVacation v JOIN FETCH v.hotel h JOIN FETCH h.destination d WHERE d.country = 'Romania'")
    List<SimpleVacation> findAllRomanianVacations();

    @Query("SELECT v FROM SimpleVacation v LEFT JOIN FETCH v.user u JOIN FETCH v.hotel h JOIN FETCH h.destination d WHERE d.city = :city AND v.isUsed = false")
    List<SimpleVacation> findByHotelCity(String city);
    @Query("SELECT sv FROM SimpleVacation sv JOIN sv.hotel h JOIN h.destination d WHERE sv.user.id = :userId")
    List<SimpleVacation> findByUserId(Long userId);

    @Query("SELECT v FROM SimpleVacation v  JOIN FETCH v.hotel h JOIN FETCH h.destination LEFT JOIN FETCH v.user u WHERE v.simpleVacation_id = :vacationId")
    SimpleVacation findByIdWithDetails(Long vacationId);

    @Query("SELECT v FROM SimpleVacation v JOIN v.hotel h JOIN h.destination d  " +
            " LEFT JOIN FETCH v.user u " +
            "WHERE d.city = :city AND h.checkin = :checkin AND h.checkout = :checkout " +
            "AND v.noOfPassengers = :noOfPassengers " +
            "AND v.isUsed = false")
    List<SimpleVacation> findByCityAndCheckinAndCheckoutAndNoOfPassengers(
            @Param("city") String city,
            @Param("checkin") String checkin,
            @Param("checkout") String checkout,
            @Param("noOfPassengers") int noOfPassengers);

    @Query("SELECT v FROM SimpleVacation v JOIN v.hotel h JOIN h.destination d  " +
            " LEFT JOIN FETCH v.user u " +
            "WHERE u.id = :userId AND v.isUsed = true")
    List<SimpleVacation> findByUserIdFetchDetails(@Param("userId") Long userId);
}