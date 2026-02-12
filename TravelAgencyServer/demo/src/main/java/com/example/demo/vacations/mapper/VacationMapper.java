package com.example.demo.vacations.mapper;

import com.example.demo.flights.mapper.FlightMapper;
import com.example.demo.hotels.mapper.HotelMapper;
import com.example.demo.user.mapper.UserMapper;
import com.example.demo.vacations.model.Vacation;
import com.example.demo.vacations.model.VacationDTO;

public class VacationMapper {
    public static VacationDTO toDTO(Vacation vacation) {
        if (vacation == null) {
            return null;
        }

        VacationDTO dto = new VacationDTO();
        dto.setVacation_id(vacation.getVacation_id());
        dto.setDescription(vacation.getDescription());
        dto.setTotalPrice(vacation.getTotalPrice());
        dto.setType(vacation.getType());
        dto.setShowInDashboard(vacation.isShowInDashboard());
        dto.setNoOfPassengers(vacation.getNoOfPassengers());
        dto.setTitle(vacation.getTitle());
        dto.setUsed(vacation.isUsed());
        dto.setUser(UserMapper.toDTO(vacation.getUser()));
        dto.setHotel(HotelMapper.toDTO(vacation.getHotel()));
        dto.setFlight(FlightMapper.toDTO(vacation.getFlight()));

        return dto;
    }
}
