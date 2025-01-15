import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionIdKey = 'sessionId';

  constructor() {}


  generateSessionId(): string {
    return Math.random().toString(36).substr(2, 9);
  }


  getSessionId(): string {
    let sessionId = sessionStorage.getItem(this.sessionIdKey);
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem(this.sessionIdKey, sessionId);
    }
    return sessionId;
  }


  clearSessionId(): void {
    sessionStorage.removeItem(this.sessionIdKey);
  }
}
