package com.example.demo.flights.model;
import com.example.demo.destinations.model.Destination;
import com.example.demo.user.model.User;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="flights")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long flight_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fromDestinationId", referencedColumnName = "destination_id")
    private Destination fromDestination;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "toDestinationId", referencedColumnName = "destination_id")
    private Destination toDestination;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    private String departureOrigin;
    private String arrivalOrigin;
    private String departureDestination;
    private String arrivalDestination;
    private String price;
    private Integer durationInMinutesDepart;
    private Integer durationInMinutesReturn;
    private String companyNameDepart;
    private String companyNameReturn;
    private String companyLogoDepart;
    private String companyLogoReturn;
    private String flightPlaceDepart;
    private String flightPlaceReturn;
    private String flightNumberDepart;
    private String flightNumberReturn;
    private String cabinClass;
    private String originDisplayCode;
    private String destinationDisplayCode;
    private int noPassengers;

    private boolean used;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getOriginDisplayCode() {
        return originDisplayCode;
    }

    public void setOriginDisplayCode(String originDisplayCode) {
        this.originDisplayCode = originDisplayCode;
    }

    public String getDestinationDisplayCode() {
        return destinationDisplayCode;
    }

    public void setDestinationDisplayCode(String destinationDisplayCode) {
        this.destinationDisplayCode = destinationDisplayCode;
    }

    public String getCabinClass() {
        return cabinClass;
    }

    public void setCabinClass(String cabinClass) {
        this.cabinClass = cabinClass;
    }

    public String getArrivalDestination() {
        return arrivalDestination;
    }

    public void setArrivalDestination(String arrivalDestination) {
        this.arrivalDestination = arrivalDestination;
    }

    public Integer getDurationInMinutesDepart() {
        return durationInMinutesDepart;
    }

    public String getCompanyNameDepart() {
        return companyNameDepart;
    }

    public void setCompanyNameDepart(String companyNameDepart) {
        this.companyNameDepart = companyNameDepart;
    }

    public String getCompanyNameReturn() {
        return companyNameReturn;
    }

    public void setCompanyNameReturn(String companyNameReturn) {
        this.companyNameReturn = companyNameReturn;
    }

    public String getCompanyLogoDepart() {
        return companyLogoDepart;
    }

    public void setCompanyLogoDepart(String companyLogoDepart) {
        this.companyLogoDepart = companyLogoDepart;
    }

    public String getCompanyLogoReturn() {
        return companyLogoReturn;
    }

    public void setCompanyLogoReturn(String companyLogoReturn) {
        this.companyLogoReturn = companyLogoReturn;
    }

    public void setDurationInMinutesDepart(Integer durationInMinutesDepart) {
        this.durationInMinutesDepart = durationInMinutesDepart;
    }

    public Integer getDurationInMinutesReturn() {
        return durationInMinutesReturn;
    }

    public void setDurationInMinutesReturn(Integer durationInMinutesReturn) {
        this.durationInMinutesReturn = durationInMinutesReturn;
    }

    public boolean getUsed() {
        return used;
    }

    public String getDepartureOrigin() {
        return departureOrigin;
    }

    public void setDepartureOrigin(String departureOrigin) {
        this.departureOrigin = departureOrigin;
    }

    public String getArrivalOrigin() {
        return arrivalOrigin;
    }

    public void setArrivalOrigin(String arrivalOrigin) {
        this.arrivalOrigin = arrivalOrigin;
    }

    public String getDepartureDestination() {
        return departureDestination;
    }

    public void setDepartureDestination(String departureDestination) {
        this.departureDestination = departureDestination;
    }

    public int getNoPassengers() {
        return noPassengers;
    }

    public void setNoPassengers(int noPassengers) {
        this.noPassengers = noPassengers;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }

    public void setFlightPlaceDepart(String flightPlaceDepart) {
        this.flightPlaceDepart = flightPlaceDepart;
    }

    public void setFlightPlaceReturn(String flightPlaceReturn) {
        this.flightPlaceReturn = flightPlaceReturn;
    }


    public Long getFlight_id() {
        return flight_id;
    }

    public void setFlight_id(Long flight_id) {
        this.flight_id = flight_id;
    }

    public Destination getFromDestination() {
        return fromDestination;
    }

    public void setFromDestination(Destination fromDestination) {
        this.fromDestination = fromDestination;
    }

    public Destination getToDestination() {
        return toDestination;
    }

    public void setToDestination(Destination toDestination) {
        this.toDestination = toDestination;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }


    public String getFlightPlaceDepart() {
        return flightPlaceDepart;
    }

    public String getFlightPlaceReturn() {
        return flightPlaceReturn;
    }

    public String getFlightNumberDepart() {
        return flightNumberDepart;
    }

    public void setFlightNumberDepart(String flightNumberDepart) {
        this.flightNumberDepart = flightNumberDepart;
    }

    public String getFlightNumberReturn() {
        return flightNumberReturn;
    }

    public void setFlightNumberReturn(String flightNumberReturn) {
        this.flightNumberReturn = flightNumberReturn;
    }

}
