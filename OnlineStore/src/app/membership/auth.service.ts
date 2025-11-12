import { Injectable } from '@angular/core';
import { CRMService } from './crm.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly LOGIN_KEY = 'loggedInStatus';
  private readonly USER_KEY = 'username';

  constructor(private crmService: CRMService) {}

  // ✅ Login using CRMService data
  login(username: string, password: string): boolean {
    const isValidUser = this.crmService.validateUser(username, password);

    if (isValidUser) {
      localStorage.setItem(this.USER_KEY, username);
      localStorage.setItem(this.LOGIN_KEY, 'true');
      return true;
    }

    // ❌ invalid credentials
    localStorage.setItem(this.LOGIN_KEY, 'false');
    return false;
  }

  // ✅ Logout user
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.setItem(this.LOGIN_KEY, 'false');
  }

  // ✅ Get logged-in username/email
  getUser(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }

  // ✅ Check login state
  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGIN_KEY) === 'true';
  }
}
