package com.example.demo.shared.services;

import com.example.demo.destinations.model.Destination;
import com.example.demo.flights.model.Flight;
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
import java.util.List;
import java.util.Locale;

public class FlightApiService {
    public List<Flight> getFlightsFromApi(String fromId, String toId, String departDate, String returnDate, Destination fromDestination, Destination toDestination, int noPassengers, String cabinClass) {
        List<Flight> flights = new ArrayList<>();

        try {
            String urlTemplate = "https://skyscanner80.p.rapidapi.com/api/v1/flights/search-roundtrip" +
                    "?fromId=%s&toId=%s&departDate=%s&returnDate=%s&adults=%d&cabinClass=%s&currency=USD&market=US&locale=en-US";
            String url = String.format(urlTemplate, fromId, toId, departDate, returnDate, noPassengers, cabinClass);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("X-RapidAPI-Key", "e35a3b5e90msh4b78b5b4ac80882p17a033jsn8256a2933cce")
                    .header("X-RapidAPI-Host", "skyscanner80.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject json = new JSONObject(response.body());
            JSONArray itineraries = json.getJSONObject("data").getJSONArray("itineraries");

            for (int i = 0; i < itineraries.length(); i++) {
                JSONObject itinerary = itineraries.getJSONObject(i);
                JSONArray legs = itinerary.getJSONArray("legs");

                Flight flight = new Flight();
                flight.setFromDestination(fromDestination);
                flight.setToDestination(toDestination);
                flight.setUsed(false);
                //
                String priceInUSDString = itinerary.getJSONObject("price").getString("formatted").substring(1); // Remove the dollar sign
                double priceValueUSD = 0.0;

                try {
                    // Parse the price string using NumberFormat
                    NumberFormat format = NumberFormat.getNumberInstance(Locale.US);
                    Number number = format.parse(priceInUSDString);
                    priceValueUSD = number.doubleValue();
                } catch (ParseException e) {
                    e.printStackTrace();
                }

                // Example exchange rate: 1 USD = 0.92 EUR (this should be updated to the current rate)
                double exchangeRateUSDToEUR = 0.92;
                double priceValueEUR = priceValueUSD * exchangeRateUSDToEUR;

                // Format the price in EUR with two decimal places
                String priceInEUR = String.format("€%.2f", priceValueEUR);
                flight.setPrice(priceInEUR);
                //
                flight.setNoPassengers(noPassengers);
                flight.setCabinClass(cabinClass);

                for (int j = 0; j < legs.length(); j++) {
                    JSONObject leg = legs.getJSONObject(j);
                    JSONObject origin = leg.getJSONObject("origin");
                    JSONObject destination = leg.getJSONObject("destination");

                    JSONArray marketingCarriers = leg.getJSONObject("carriers").getJSONArray("marketing");
                    if (marketingCarriers.length() > 0) {
                        JSONObject marketingCarrier = marketingCarriers.getJSONObject(0);
                        if (j == 0) {
                            flight.setCompanyNameDepart(marketingCarrier.getString("name"));
                            flight.setCompanyLogoDepart(marketingCarrier.getString("logoUrl"));
                        } else {
                            flight.setCompanyNameReturn(marketingCarrier.getString("name"));
                            flight.setCompanyLogoReturn(marketingCarrier.getString("logoUrl"));
                        }
                    } else {
                        if (j == 0) flight.setCompanyNameDepart("Unknown Air Company");
                        else flight.setCompanyNameReturn("Unknown Air Company");
                    }
                    if (j == 0) flight.setDurationInMinutesDepart(leg.getInt("durationInMinutes"));
                    else flight.setDurationInMinutesReturn(leg.getInt("durationInMinutes"));


                    if (leg.has("segments") && leg.getJSONArray("segments").length() > 0) {
                        JSONObject firstSegment = leg.getJSONArray("segments").getJSONObject(0);

                        if (firstSegment.has("flightNumber")) {
                            if (j == 0) flight.setFlightNumberDepart(firstSegment.getString("flightNumber"));
                            else flight.setFlightNumberReturn(firstSegment.getString("flightNumber"));
                        } else {
                            if (j == 0) flight.setFlightNumberDepart("Flight number not available");
                            else flight.setFlightNumberReturn("Flight number not available");
                        }
                    } else {
                        if (j == 0) flight.setFlightNumberDepart("Flight number not available");
                        else flight.setFlightNumberReturn("Flight number not available");
                    }
                    if (j == 0) {
                        flight.setDepartureOrigin(leg.getString("departure"));
                        flight.setArrivalOrigin(leg.getString("arrival"));
                    } else {
                        flight.setDepartureDestination(leg.getString("departure"));
                        flight.setArrivalDestination(leg.getString("arrival"));
                    }
                    if(j==0) {
                        flight.setFlightPlaceDepart(origin.getString("name"));
                        flight.setFlightPlaceReturn(destination.getString("name"));
                        flight.setOriginDisplayCode(origin.getString("id"));
                        flight.setDestinationDisplayCode(destination.getString("id"));
                    }
                }
                    flights.add(flight);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flights;
    }

    public String getFlightIdByQuery(String query) {
        String id = null;
        try {
            String urlTemplate = "https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete" +
                    "?query=%s&market=US&locale=en-US";
            String url = String.format(urlTemplate, query);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("X-RapidAPI-Key", "e35a3b5e90msh4b78b5b4ac80882p17a033jsn8256a2933cce")
                    .header("X-RapidAPI-Host", "skyscanner80.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            JSONObject jsonResponse = new JSONObject(response.body());
            JSONArray dataArray = jsonResponse.getJSONArray("data");

            if (dataArray != null && dataArray.length() > 0) {
                JSONObject firstItem = dataArray.getJSONObject(0);
                id = firstItem.getString("id"); // Get the id of the first object
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return id;
    }
}
