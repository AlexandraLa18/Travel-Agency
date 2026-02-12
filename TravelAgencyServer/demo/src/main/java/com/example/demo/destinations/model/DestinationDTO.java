package com.example.demo.destinations.model;

public class DestinationDTO {
        Long destination_id;

        private String city;
        private String country;
        private String entityId;
        private boolean visible;
        private String imageUrl;
        private boolean showInDashboard;

    public boolean isShowInDashboard() {
        return showInDashboard;
    }

    public void setShowInDashboard(boolean showInDashboard) {
        this.showInDashboard = showInDashboard;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isVisible() {
            return visible;
        }

        public void setVisible(boolean visible) {
            this.visible = visible;
        }

        public Long getDestination_id() {
            return destination_id;
        }

        public void setDestination_id(Long destination_id) {
            this.destination_id = destination_id;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }

        public String getEntityId() {
            return entityId;
        }

        public void setEntityId(String entityId) {
            this.entityId = entityId;
        }
}

