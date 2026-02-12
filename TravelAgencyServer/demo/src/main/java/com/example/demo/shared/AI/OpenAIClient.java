package com.example.demo.shared.AI;
import com.fasterxml.jackson.databind.JsonNode;
import okhttp3.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
public class OpenAIClient {
    private static final String API_KEY = "";
    private static final String BASE_URL = "https://api.openai.com/v1/chat/completions";

    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getChatbotResponse(String userInput) throws IOException {
        String jsonBody = objectMapper.writeValueAsString(buildRequestBody("gpt-3.5-turbo-16k", userInput));

        RequestBody body = RequestBody.create(jsonBody, MediaType.get("application/json"));
        Request request = new Request.Builder()
                .url(BASE_URL)
                .post(body)
                .addHeader("Authorization", "Bearer " + API_KEY)
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }
            String responseBody = response.body().string();
            JsonNode rootNode = objectMapper.readTree(responseBody);
            JsonNode messageContent = rootNode.path("choices").get(0).path("message").path("content");
            return messageContent.asText();
        }
    }

    private static ChatRequest buildRequestBody(String model, String userMessage) {
        return new ChatRequest(
                model,
                new Message[]{new Message("system", "You are a helpful assistant."),
                        new Message("user", userMessage)}
        );
    }

    private static class ChatRequest {
        public String model;
        public Message[] messages;

        public ChatRequest(String model, Message[] messages) {
            this.model = model;
            this.messages = messages;
        }
    }

    private static class Message {
        public String role;
        public String content;

        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }
    }
}
