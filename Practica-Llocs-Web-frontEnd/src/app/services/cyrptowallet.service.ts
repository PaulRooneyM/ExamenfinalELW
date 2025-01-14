import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoWalletService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/coins';

  constructor() {}


  getBitcoinPrice(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/BTC/value`);
  }

  getEthereumPrice(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/ETH/value`);
  }

  getLitecoinPrice(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/LTC/value`);
  }


}











