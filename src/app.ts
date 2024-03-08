// src/app.ts

import { PLATFORM } from 'aurelia-framework';

export class App {
  router: any;

  configureRouter(config: { map: (routes: any[]) => void }, router: any) {
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: PLATFORM.moduleName('./login/login.html'), title: 'Login' },
      { route: 'signup', name: 'signup', moduleId: PLATFORM.moduleName('./signup/signup.html'), title: 'Signup' },
      { route: 'home', name: 'home', moduleId: PLATFORM.moduleName('./home/home.html'), title: 'Home' },
    ]);
    
    this.router = router;
  }
}
