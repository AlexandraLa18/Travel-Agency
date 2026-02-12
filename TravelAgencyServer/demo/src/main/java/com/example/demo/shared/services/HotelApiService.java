package com.example.demo.shared.services;
import com.example.demo.destinations.model.Destination;
import com.example.demo.hotels.model.Hotel;
import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class HotelApiService {
    public List<Hotel> getHotelsFromApi(Destination destination, String checkin, String checkout, int rooms, int adults,int resultsPErPAge, int page) {
        List<Hotel> hotels = new ArrayList<>();

        try {
            String urlTemplate = "https://skyscanner80.p.rapidapi.com/api/v1/hotels/search" +
                    "?entityId=%s&checkin=%s&checkout=%s&rooms=%d&adults=%d&resultsPerPage=%d&page=%d&currency=USD&market=US&locale=en-US";
            String url = String.format(urlTemplate, destination.getEntityId(), checkin, checkout, rooms, adults, resultsPErPAge, page);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("X-RapidAPI-Key", "e35a3b5e90msh4b78b5b4ac80882p17a033jsn8256a2933cce")
                    .header("X-RapidAPI-Host", "skyscanner80.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject jsonObject = new JSONObject(response.body());
            JSONArray hotelsArray = jsonObject.getJSONObject("data").getJSONArray("hotels");

            for (int i = 0; i < hotelsArray.length(); i++) {
                JSONObject hotelJson = hotelsArray.getJSONObject(i);
                Hotel hotel = new Hotel();
                hotel.setEntityId(hotelJson.getString("hotelId"));
                hotel.setName(hotelJson.getString("name"));
                hotel.setStars(String.valueOf(hotelJson.getInt("stars")));
                hotel.setDistance(hotelJson.getString("distance"));
                hotel.setRelevantPoiDistance(hotelJson.optString("relevantPoiDistance", "-"));
                //
                String priceInINR = hotelJson.getString("price").substring(2).trim(); // Remove the "₹ " sign (first two characters) and trim whitespace
                double priceValueINR = 0.0;

                try {
                    // Parse the price string using NumberFormat with Indian locale
                    NumberFormat format = NumberFormat.getNumberInstance(new Locale("en", "IN"));
                    Number number = format.parse(priceInINR);
                    priceValueINR = number.doubleValue();
                } catch (ParseException e) {
                    e.printStackTrace();
                }

                double exchangeRate = 0.011; // Example exchange rate: 1 INR = 0.011 EUR (this should be updated to the current rate)
                double priceValueEUR = priceValueINR * exchangeRate; // Convert INR to EUR

                // Format the price in EUR with two decimal places
                String priceInEUR = String.format("€%.2f", priceValueEUR);
                hotel.setPrice(priceInEUR);
                //
                hotel.setPriceDescription(hotelJson.getString("priceDescription"));
                hotel.setTaxPolicy(hotelJson.getString("taxPolicy"));
                hotel.setCheckin(checkin);
                hotel.setCheckout(checkout);
                hotel.setRooms(rooms);
                hotel.setAdults(adults);
                if (hotelJson.has("images")) {
                    JSONArray images = hotelJson.getJSONArray("images");
                    if (images.length() > 0) {
                        hotel.setImage1(images.getString(0));
                    }
                    if (images.length() > 1) {
                        hotel.setImage2(images.getString(1));
                    }
                    if (images.length() > 2) {
                        hotel.setImage3(images.getString(2));
                    }
                }
                Hotel newHotel = new Hotel();
                newHotel = getHotelDetailsFromApi(hotel, destination);
                hotels.add(newHotel);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return hotels;
    }

    public Hotel getHotelDetailsFromApi(Hotel oldHotel, Destination destination) {
        Hotel hotel = new Hotel();
        String amenitiesDescription = null;
        try {
            String urlTemplate = "https://skyscanner80.p.rapidapi.com/api/v1/hotels/detail" +
                    "?id=%s&currency=USD&market=US&locale=en-US";
            String url = String.format(urlTemplate, oldHotel.getEntityId());

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("X-RapidAPI-Key", "e35a3b5e90msh4b78b5b4ac80882p17a033jsn8256a2933cce")
                    .header("X-RapidAPI-Host", "skyscanner80.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject jsonObject = new JSONObject(response.body());
            JSONObject data = jsonObject.getJSONObject("data");
            if (data.has("general")) {
                JSONObject general = data.getJSONObject("general");
                hotel.setName(general.getString("name"));
                hotel.setStars(String.valueOf(general.getInt("stars")));
            }
            if (data.has("location")) {
                JSONObject location = data.getJSONObject("location");
                hotel.setAddress(location.getString("address"));
            }
            if (data.has("goodToKnow")) {
                JSONObject goodToKnow = data.getJSONObject("goodToKnow");
                hotel.setCheckin(goodToKnow.getJSONObject("checkinTime").getString("time"));
                hotel.setCheckout(goodToKnow.getJSONObject("checkoutTime").getString("time"));
                String description = goodToKnow.getJSONObject("description").getString("content");
                description = description.replace("\n", " ");
                hotel.setDescription(description);
                JSONArray noticeFromTheHotel = goodToKnow.getJSONObject("policies").getJSONArray("content");
                if(noticeFromTheHotel != null && noticeFromTheHotel.length() > 0){
                    JSONArray values = noticeFromTheHotel.getJSONObject(0).getJSONArray("values");
                    if(values != null && values.length() > 0) {
                        hotel.setNoticeFromTheHotel(values.getJSONObject(0).getString("content"));
                    }
                }
            }

            if (data.has("amenities") && data.getJSONObject("amenities").has("content")) {
                JSONObject amenities = data.getJSONObject("amenities");
                JSONArray content = amenities.getJSONArray("content");
                if (content.length() > 0) {
                    amenitiesDescription = content.getJSONObject(0).optString("description", "No description");
                    hotel.setAmenitiesDescription(amenitiesDescription);
                    hotel.setHasRestaurant(amenitiesDescription.toLowerCase().contains("restaurant"));
                    hotel.setHasRoomService(amenitiesDescription.toLowerCase().contains("room service"));
                    hotel.setNoSmoking(amenitiesDescription.toLowerCase().contains("non-smoking"));
                    hotel.setHasWifi(amenitiesDescription.toLowerCase().contains("wifi"));
                    hotel.setHasBar(amenitiesDescription.toLowerCase().contains("bar"));
                    hotel.setPetAllow(amenitiesDescription.toLowerCase().contains("pets allowed"));
                }
            }
            hotel.setDistance(oldHotel.getDistance());
            hotel.setRelevantPoiDistance(oldHotel.getRelevantPoiDistance());
            hotel.setPrice(oldHotel.getPrice());
            hotel.setEntityId(oldHotel.getEntityId());
            hotel.setCheckin(oldHotel.getCheckin());
            hotel.setCheckout(oldHotel.getCheckout());
            hotel.setRooms(oldHotel.getRooms());
            hotel.setAdults(oldHotel.getAdults());
            hotel.setImage1(oldHotel.getImage1());
            hotel.setImage2(oldHotel.getImage2());
            hotel.setImage3(oldHotel.getImage3());
            hotel.setUsed(false);
            hotel.setDestination(destination);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return hotel;
    }
}
