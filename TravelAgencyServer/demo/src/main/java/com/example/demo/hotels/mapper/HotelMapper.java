package com.example.demo.hotels.mapper;

import com.example.demo.destinations.mapper.DestinationMapper;
import com.example.demo.hotels.model.Hotel;
import com.example.demo.hotels.model.HotelDTO;

public class HotelMapper {

    public static HotelDTO toDTO(Hotel hotel) {
        if (hotel == null) {
            return null;
        }

        HotelDTO dto = new HotelDTO();
        dto.setId(hotel.getId());
        dto.setName(hotel.getName());
        dto.setAddress(hotel.getAddress());
        dto.setCheckin(hotel.getCheckin());
        dto.setCheckout(hotel.getCheckout());
        dto.setStars(hotel.getStars());
        dto.setDistance(hotel.getDistance());
        dto.setRelevantPoiDistance(hotel.getRelevantPoiDistance());
        dto.setPrice(hotel.getPrice());
        dto.setEntityId(hotel.getEntityId());
        dto.setDescription(hotel.getDescription());
        dto.setImage1(hotel.getImage1());
        dto.setImage2(hotel.getImage2());
        dto.setImage3(hotel.getImage3());
        dto.setAmenitiesDescription(hotel.getAmenitiesDescription());
        dto.setNoticeFromTheHotel(hotel.getNoticeFromTheHotel());
        dto.setRooms(hotel.getRooms());
        dto.setAdults(hotel.getAdults());
        dto.setHasRestaurant(hotel.isHasRestaurant());
        dto.setHasRoomService(hotel.isHasRoomService());
        dto.setNoSmoking(hotel.isNoSmoking());
        dto.setHasWifi(hotel.isHasWifi());
        dto.setHasBar(hotel.isHasBar());
        dto.setPetAllow(hotel.isPetAllow());
        dto.setPriceDescription(hotel.getPriceDescription());
        dto.setTaxPolicy(hotel.getTaxPolicy());
        dto.setUsed(hotel.isUsed());
        dto.setDestination(DestinationMapper.toDTO(hotel.getDestination()));
        dto.setUser(hotel.getUser());

        return dto;
    }
}

