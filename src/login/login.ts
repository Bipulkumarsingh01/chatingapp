
import { Router } from 'aurelia-router';
import { AuthService } from '../api/auth-service';
import { inject } from 'aurelia-framework';

@inject(AuthService, Router)
export class Login {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      console.log('Attempting login...');
      await this.authService.login(this.email, this.password);
      console.log('Login successful');
      this.router.navigateToRoute('home');
    } catch (error) {
      console.error('Login failed', error);
    }
  }
  
  goToSignup() {
    this.router.navigateToRoute('signup');
  }
}
