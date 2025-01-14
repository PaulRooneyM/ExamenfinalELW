import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/users';

  constructor() {}

  getBalance(userId: string): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}/${userId}/balance`);
  }

  updateBalance(userId: string, newBalance: number): Observable<any> {
      return this.http.put(`${this.baseUrl}/${userId}/balance`, { balance: newBalance });
  }

  updateBitcoinAmount(userId: string, newBitcoinAmount: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}/bitcoinAmount`, { bitcoinAmount: newBitcoinAmount });
  }

  getBitcoinAmount(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/bitcoinAmount`);
  }

  updateEthereumAmount(userId: string, newEthereumAmount: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}/ethereumAmount`, { ethereumAmount: newEthereumAmount });
  }

  getEthereumAmount(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/ethereumAmount`);
  }

  updateLitecoinAmount(userId: string, newLitecoinAmount: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}/litecoinAmount`, { litecoinAmount: newLitecoinAmount });
  }

  getLitecoinAmount(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/litecoinAmount`);
  }

  getUserName(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/username`);
  }


}
