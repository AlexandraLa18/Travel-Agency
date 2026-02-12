package com.example.demo.simpleVacation.model;

import com.example.demo.hotels.model.Hotel;
import com.example.demo.user.model.User;
import jakarta.persistence.*;

@Entity
@Table(name="simpleVacation")
public class SimpleVacation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long simpleVacation_id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", unique = true)
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
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

    public Long getSimpleVacation_id() {
        return simpleVacation_id;
    }

    public void setSimpleVacation_id(Long simpleVacation_id) {
        this.simpleVacation_id = simpleVacation_id;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public boolean isShowInDashboard() {
        return showInDashboard;
    }

    public void setShowInDashboard(boolean showInDashboard) {
        this.showInDashboard = showInDashboard;
    }

    public int getNoOfPassengers() {
        return noOfPassengers;
    }

    public void setNoOfPassengers(int noOfPassengers) {
        this.noOfPassengers = noOfPassengers;
    }
}
