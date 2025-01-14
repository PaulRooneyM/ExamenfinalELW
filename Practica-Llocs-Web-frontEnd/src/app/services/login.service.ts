import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface LoginUser {
  _id: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/users';

  constructor() { }

  getUsers(): Observable<LoginUser[]> {
    return this.httpClient.get<LoginUser[]>(this.baseUrl);
  }

}
