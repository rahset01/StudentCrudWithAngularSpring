import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  login(username: string, password: string): boolean {
    debugger;
    if (username === 'admin@gmail.com' && password === 'rahul@123') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
