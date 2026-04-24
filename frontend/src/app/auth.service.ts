import { Injectable } from '@angular/core';

const AUTH_STORAGE_KEY = 'auth.basic.credentials';

@Injectable({ providedIn: 'root' })
export class AuthService {
  setCredentials(username: string, password: string): void {
    const credentials = btoa(`${username}:${password}`);
    localStorage.setItem(AUTH_STORAGE_KEY, credentials);
  }

  clearCredentials(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  getAuthHeader(): string | null {
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    return token ? `Basic ${token}` : null;
  }

  isAuthenticated(): boolean {
    return this.getAuthHeader() !== null;
  }
}
