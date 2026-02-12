package com.example.demo.shared.AI;

import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ChatBotService {
    private final OpenAIClient openAIClient = new OpenAIClient();

    public String getResponse(String userMessage) {
        String contextualMessage = "Please respond to this query only if it pertains to travel, including destinations, " +
                "travel preferences, hotels, flights, and related topics: ";

        String fullMessage = contextualMessage + userMessage;
        try {
            return openAIClient.getChatbotResponse(fullMessage);
        } catch (IOException e) {
            e.printStackTrace();
            return "Sorry, I couldn't process your request.";
        }
    }
}