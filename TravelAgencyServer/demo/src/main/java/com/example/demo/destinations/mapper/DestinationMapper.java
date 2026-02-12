package com.example.demo.destinations.mapper;

import com.example.demo.destinations.model.Destination;
import com.example.demo.destinations.model.DestinationDTO;

public class DestinationMapper {

    public static DestinationDTO toDTO(Destination destination) {
        if (destination == null) {
            return null;
        }

        DestinationDTO dto = new DestinationDTO();
        dto.setDestination_id(destination.getDestination_id());
        dto.setCity(destination.getCity());
        dto.setCountry(destination.getCountry());
        dto.setEntityId(destination.getEntityId());
        dto.setVisible(destination.isVisible());
        dto.setImageUrl(destination.getImageUrl());
        dto.setShowInDashboard(destination.isShowInDashboard());

        return dto;
    }
}
