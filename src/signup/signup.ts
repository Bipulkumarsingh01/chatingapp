// src/components/signup/signup.ts

import { AuthService } from '../api/auth-service';
import { inject } from 'aurelia-framework';

@inject(AuthService)
export class Signup {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService) {}

  async signup() {
    try {
      if (this.password !== this.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await this.authService.signup(this.email, this.password);

    } catch (error) {
      console.error('Signup failed', error);
    }
  }
}
