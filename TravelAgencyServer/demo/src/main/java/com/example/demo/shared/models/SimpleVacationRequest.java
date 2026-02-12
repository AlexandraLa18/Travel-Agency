package com.example.demo.shared.models;

import com.example.demo.hotels.model.Hotel;
import com.example.demo.hotels.model.HotelDTO;

public class SimpleVacationRequest {
    private Hotel hotel;
    private Long userId;

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
