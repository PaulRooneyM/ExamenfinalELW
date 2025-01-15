import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RegistreService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/registre';

  constructor() {}


  createRegistre(registreData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, registreData);
  }

  getRegistres(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ultimsevents`);
  }

}
