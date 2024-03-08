
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { POST_USER_API_URL, POST_MESSAGE_API_URL, MESSAGES_API_URL } from '../../config/config'

@inject(HttpClient)
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  async signup(email: string, password: string) {
    try {
      // Hash the password before sending the signup request
      const hashedPassword = await this.hashPassword(password);

      // Make a POST request to the signup endpoint
      await this.httpClient.post(POST_USER_API_URL, { email, password: hashedPassword });
    } catch (error) {
      console.error('Signup failed', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await this.httpClient.post(POST_USER_API_URL, { email, password });
      const data = await response.json();

      if (data.success) {
        console.log('Login successful');
      } else {
        console.error('Login failed. Invalid credentials.');
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }

  async sendChatMessage(message: string) {
    try {
      await this.httpClient.post(POST_MESSAGE_API_URL, { message });
    } catch (error) {
      console.error('Send message failed', error);
      throw error;
    }
  }

  async getChatMessages() {
    try {
      const response = await this.httpClient.get(MESSAGES_API_URL);
      const messages = await response.json();
      return messages;
    } catch (error) {
      console.error('Get messages failed', error);
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return password;
  }
}

