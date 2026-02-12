package com.example.demo.simpleVacation.mapper;

import com.example.demo.hotels.mapper.HotelMapper;
import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.simpleVacation.model.SimpleVacationDTO;
import com.example.demo.user.mapper.UserMapper;

public class SimpleVacationMapper {

    public static SimpleVacationDTO toDTO(SimpleVacation vacation) {
        if (vacation == null) {
            return null;
        }

        SimpleVacationDTO dto = new SimpleVacationDTO();
        dto.setSimpleVacation_id(vacation.getSimpleVacation_id());
        dto.setDescription(vacation.getDescription());
        dto.setTotalPrice(vacation.getTotalPrice());
        dto.setType(vacation.getType());
        dto.setShowInDashboard(vacation.isShowInDashboard());
        dto.setNoOfPassengers(vacation.getNoOfPassengers());
        dto.setTitle(vacation.getTitle());
        dto.setUsed(vacation.isUsed());
        dto.setHotel(HotelMapper.toDTO(vacation.getHotel()));
        dto.setUser(UserMapper.toDTO(vacation.getUser()));

        return dto;
    }
}
