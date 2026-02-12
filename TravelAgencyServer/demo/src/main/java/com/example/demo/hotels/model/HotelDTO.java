package com.example.demo.hotels.model;

import com.example.demo.destinations.model.Destination;
import com.example.demo.destinations.model.DestinationDTO;
import com.example.demo.user.model.User;

public class HotelDTO {
    private Long id;
    private String name;
    private String address;
    private DestinationDTO destination;
    private User user;
    private String checkin;
    private String checkout;
    private String stars;
    private String distance;
    private String relevantPoiDistance;
    private String price;
    private String entityId;
    private String description;
    private String image1;
    private String image2;
    private String image3;
    private String amenitiesDescription;
    private String noticeFromTheHotel;
    private int rooms;
    private int adults;
    private boolean hasRestaurant;
    private boolean hasRoomService;
    private boolean noSmoking;
    private boolean hasWifi;
    private boolean hasBar;
    private boolean petAllow;
    private String priceDescription;
    private String taxPolicy;
    private boolean used;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isHasRoomService() {
        return hasRoomService;
    }

    public String getPriceDescription() {
        return priceDescription;
    }

    public void setPriceDescription(String priceDescription) {
        this.priceDescription = priceDescription;
    }

    public String getTaxPolicy() {
        return taxPolicy;
    }

    public void setTaxPolicy(String taxPolicy) {
        this.taxPolicy = taxPolicy;
    }

    public void setHasRoomService(boolean hasRoomService) {
        this.hasRoomService = hasRoomService;
    }

    public boolean isNoSmoking() {
        return noSmoking;
    }

    public void setNoSmoking(boolean noSmoking) {
        this.noSmoking = noSmoking;
    }

    public boolean isHasWifi() {
        return hasWifi;
    }

    public void setHasWifi(boolean hasWifi) {
        this.hasWifi = hasWifi;
    }

    public boolean isHasBar() {
        return hasBar;
    }

    public void setHasBar(boolean hasBar) {
        this.hasBar = hasBar;
    }

    public boolean isPetAllow() {
        return petAllow;
    }

    public void setPetAllow(boolean petAllow) {
        this.petAllow = petAllow;
    }

    public boolean isHasRestaurant() {
        return hasRestaurant;
    }

    public void setHasRestaurant(boolean hasRestaurant) {
        this.hasRestaurant = hasRestaurant;
    }

    public int getRooms() {
        return rooms;
    }

    public void setRooms(int rooms) {
        this.rooms = rooms;
    }

    public int getAdults() {
        return adults;
    }

    public void setAdults(int adults) {
        this.adults = adults;
    }

    public String getNoticeFromTheHotel() {
        return noticeFromTheHotel;
    }

    public void setNoticeFromTheHotel(String noticeFromTheHotel) {
        this.noticeFromTheHotel = noticeFromTheHotel;
    }

    public String getAmenitiesDescription() {
        return amenitiesDescription;
    }

    public void setAmenitiesDescription(String amenitiesDescription) {
        this.amenitiesDescription = amenitiesDescription;
    }

    public HotelDTO() {}

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public DestinationDTO getDestination() {
        return destination;
    }

    public String getCheckin() {
        return checkin;
    }

    public String getCheckout() {
        return checkout;
    }

    public String getStars() {
        return stars;
    }

    public String getDistance() {
        return distance;
    }

    public String getRelevantPoiDistance() {
        return relevantPoiDistance;
    }

    public String getPrice() {
        return price;
    }

    public String getEntityId() {
        return entityId;
    }

    public String getDescription() {
        return description;
    }

    public String getImage1() {
        return image1;
    }

    public String getImage2() {
        return image2;
    }

    public String getImage3() {
        return image3;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDestination(DestinationDTO destination) {
        this.destination = destination;
    }


    public void setCheckin(String checkin) {
        this.checkin = checkin;
    }

    public void setCheckout(String checkout) {
        this.checkout = checkout;
    }

    public void setStars(String stars) {
        this.stars = stars;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public void setRelevantPoiDistance(String relevantPoiDistance) {
        this.relevantPoiDistance = relevantPoiDistance;
    }


    public void setPrice(String price) {
        this.price = price;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImage1(String image1) {
        this.image1 = image1;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public void setImage3(String image3) {
        this.image3 = image3;
    }
}
