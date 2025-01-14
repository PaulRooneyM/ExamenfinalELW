import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MediaService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/media';

  constructor() {}


  getBitcoinGif(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/bitcoin`);
  }

  getEthereumGif(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/ethereum`);
  }

  getLitecoinGif(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/litecoin`);
  }

}
