package com.example.demo.vacations.model;

import com.example.demo.flights.model.Flight;
import com.example.demo.hotels.model.Hotel;
import com.example.demo.user.model.User;
import jakarta.persistence.*;

@Entity
@Table(name="vacation")
public class Vacation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long vacation_id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "flight_id", unique = true)
    private Flight flight;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", unique = true)
    private Hotel hotel;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;
    private String type;
    private String title;
    private String description;
    private String totalPrice;
    private boolean showInDashboard;
    private int noOfPassengers;
    private boolean isUsed=false;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isUsed() {
        return isUsed;
    }

    public void setUsed(boolean used) {
        isUsed = used;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getNoOfPassengers() {
        return noOfPassengers;
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
