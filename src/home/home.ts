import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { MESSAGES_API_URL, POST_MESSAGE_API_URL } from '../../config/config';

@inject(HttpClient)
export class Home {
  websocket: WebSocket | null = null;
  newMessage = '';
  chatMessages: HTMLDivElement | null = null;

  constructor(private httpClient: HttpClient) {
    this.httpClient.configure((config) => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://localhost:7223/api');
    });
  }

  attached(): void {
    this.websocket = new WebSocket('wss://localhost:7223/chatHub');

    if (this.websocket) {
      this.websocket.onopen = () => {
        console.log('WebSocket connection opened');
      };

      this.websocket.onmessage = (event) => {
        this.handleIncomingMessage(event.data);
      };

      this.websocket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }

  detached(): void {
    if (this.websocket) {
      this.websocket.close();
    }
  }

  handleIncomingMessage(message: string): void {
    if (this.chatMessages && this.websocket) {
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      this.chatMessages.appendChild(messageElement);

      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    this.fetchMessages();
  }

  async sendMessage(): Promise<void> {
    try {
      if (this.websocket && this.websocket.readyState === WebSocket.OPEN && this.newMessage.trim() !== '') {
        this.websocket.send(this.newMessage.trim());
        this.newMessage = '';
      }

      await this.httpClient.post(POST_MESSAGE_API_URL, { message: this.newMessage.trim() });
      this.fetchMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  async fetchMessages(): Promise<void> {
    try {
      const response = await this.httpClient.get(MESSAGES_API_URL);
      const messages = await response.json();
      console.log('Fetched messages:', messages);

    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  }
}
