package com.example.demo.shared.AI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {
    private final ChatBotService chatbotService;

    public ChatbotController(ChatBotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/message")
    public ResponseEntity<String> getChatbotResponse(@RequestBody String message) {
        String response = chatbotService.getResponse(message);
        return ResponseEntity.ok().body(response);
    }
}
