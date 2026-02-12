import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getChatbotResponse(message: string) {
    return this.http.post(
      `${this.apiUrl}/api/chatbot/message`,
      { message },
      {
        responseType: 'text',
      }
    );
  }
}
