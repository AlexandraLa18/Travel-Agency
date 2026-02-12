import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ChatbotService } from '../../services/chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
  standalone: true,
})
export class ChatbotComponent {
  userMessage = '';
  chatbotResponse: string = 'Hi there! 👋 Welcome to our travel assistant. You can ask me anything about traveling, destinations, travel tips, and more. Just type in your question and I`ll do my best to help you plan your next adventure!';
  isLoading = false;

  constructor(
    private chatbotService: ChatbotService,
    private modalController: ModalController
  ) {}

  async dismiss() {
    await this.modalController.dismiss();
  }

  sendMessage() {
    this.isLoading = true;
    this.chatbotService.getChatbotResponse(this.userMessage).subscribe({
      next: (response) => {
        this.chatbotResponse = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error getting response from chatbot:', err);
        this.chatbotResponse = 'Failed to get response.';
        this.isLoading = false;
      },
    });
    this.userMessage = '';
  }
}
