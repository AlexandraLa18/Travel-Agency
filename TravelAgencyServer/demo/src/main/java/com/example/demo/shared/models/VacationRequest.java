package com.example.demo.shared.models;

import com.example.demo.flights.model.Flight;
import com.example.demo.hotels.model.Hotel;

public class VacationRequest {
    private Hotel hotel;
    private Flight flight;
    private Long userId;

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
