package com.example.demo.vacations.model;

import com.example.demo.flights.model.Flight;
import com.example.demo.flights.model.FlightDTO;
import com.example.demo.hotels.model.Hotel;
import com.example.demo.hotels.model.HotelDTO;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDTO;


public class VacationDTO {
    Long vacation_id;
    private FlightDTO flight;
    private HotelDTO hotel;
    private UserDTO user;
    private String type;
    private String title;
    private String description;
    private String totalPrice;
    private boolean showInDashboard;
    private int noOfPassengers;
    private boolean isUsed=false;

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public boolean isUsed() {
        return isUsed;
    }

    public void setUsed(boolean used) {
        isUsed = used;
    }

    public int getNoOfPassengers() {
        return noOfPassengers;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setNoOfPassengers(int noOfPassengers) {
        this.noOfPassengers = noOfPassengers;
    }

    public boolean isShowInDashboard() {
        return showInDashboard;
    }

    public void setShowInDashboard(boolean showInDashboard) {
        this.showInDashboard = showInDashboard;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getVacation_id() {
        return vacation_id;
    }

    public void setVacation_id(Long vacation_id) {
        this.vacation_id = vacation_id;
    }

    public FlightDTO getFlight() {
        return flight;
    }

    public void setFlight(FlightDTO flight) {
        this.flight = flight;
    }

    public HotelDTO getHotel() {
        return hotel;
    }

    public void setHotel(HotelDTO hotel) {
        this.hotel = hotel;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }
}
