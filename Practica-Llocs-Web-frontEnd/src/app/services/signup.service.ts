import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private httpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/users';

  constructor() { }

  signup(username: string, password: string): Observable<any> {
    const signupData = { username, password };

    return this.httpClient.post(`${this.baseUrl}`, signupData);
  }
}
