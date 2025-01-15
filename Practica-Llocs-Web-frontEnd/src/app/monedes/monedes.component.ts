import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';
import { BuybitcoinComponent } from "../buybitcoin/buybitcoin.component";
import { SellbitcoinComponent } from '../sellbitcoin/sellbitcoin.component';
import { BuyethereumComponent } from "../buyethereum/buyethereum.component";
import { SellethereumComponent } from "../sellethereum/sellethereum.component";
import { BuylitecoinComponent } from "../buylitecoin/buylitecoin.component";
import { SelllitecoinComponent } from "../selllitecoin/selllitecoin.component";
import { RegistreService } from '../services/registre.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-monedes',
  standalone: true,
  imports: [FormsModule, BuybitcoinComponent, SellbitcoinComponent, BuyethereumComponent, SellethereumComponent, BuylitecoinComponent, SelllitecoinComponent],
  templateUrl: './monedes.component.html',
  styleUrl: './monedes.component.css'
})
export class MonedesComponent implements OnInit {
  constructor() {}
  sessionId: string = '';
  userId: string | null = null;
  llocEvent: string = 'monedes';
  tipusEvent: string = 'visita';

  private RegistreService = inject(RegistreService);
  private SessionService = inject(SessionService);

  ngOnInit() {
    this.showLoadingBar();
    setTimeout(() => this.hideLoadingBar(), 1500);
    this.sessionId = this.SessionService.getSessionId();
    this.logVisit();
  }

  private logVisit(): void {
    const registreData = {
      sessionId: this.sessionId,
      userId: localStorage.getItem('userId'), // Puede ser null si no hay un usuario logueado
      llocEvent: this.llocEvent,
      tipusEvent: this.tipusEvent,
    };


    console.log(`Page visited at: ${new Date().toISOString()}, Session ID: ${this.sessionId}`);
    this.RegistreService.createRegistre(registreData ).subscribe(
      (response: any) => {
        console.log('Visit logged successfully:', response);
      },
      (error) => {
        console.error('Error logging visit:', error);
      }
    );

  }



  showLoadingBar() {
    const loader = document.querySelector('.loader') as HTMLElement;
    if (loader) {
      loader.style.display = 'block';
    }
  }

  hideLoadingBar() {
    const loader = document.querySelector('.loader') as HTMLElement;
    const container = document.querySelector('.crypto-container') as HTMLElement;
    if (loader && container) {
      loader.style.display = 'none';
      container.style.display = 'block';
    }
  }
}
