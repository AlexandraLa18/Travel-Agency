package com.example.demo.shared.services;
import com.example.demo.destinations.model.Destination;
import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
public class DestinationApiService {
    public List<Destination> getDestinationsFromApi(String name) {
        List<Destination> destinations = new ArrayList<>();

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(String.format("https://skyscanner80.p.rapidapi.com/api/v1/hotels/auto-complete?query=%s", name)))
                    .header("X-RapidAPI-Key", "e35a3b5e90msh4b78b5b4ac80882p17a033jsn8256a2933cce")
                    .header("X-RapidAPI-Host", "skyscanner80.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject jsonResponse = new JSONObject(response.body());
            JSONArray dataArray = jsonResponse.getJSONArray("data");

            for (int i = 0; i < dataArray.length(); i++) {
                JSONObject item = dataArray.getJSONObject(i);
                if (item.getString("entityType").equals("city")) {
                    Destination destination = new Destination();
                    destination.setCity(item.getString("entityName"));
                    destination.setEntityId(item.getString("entityId"));

                    int lastPipeIndex = item.getString("hierarchy").lastIndexOf('|');
                    if (lastPipeIndex != -1) { // Check if the '|' character is found
                        String afterLastPipe = item.getString("hierarchy").substring(lastPipeIndex + 1); // Extract substring after the last '|'
                        destination.setCountry(afterLastPipe);
                    }

                    destinations.add(destination);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return destinations;
    }
}
