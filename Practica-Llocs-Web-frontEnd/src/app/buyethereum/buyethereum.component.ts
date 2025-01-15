import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';
import { CommonModule } from '@angular/common';
import { MediaService } from '../services/media.service';
import { RegistreService } from '../services/registre.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-buyethereum',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './buyethereum.component.html',
  styleUrl: './buyethereum.component.css'
})
export class BuyethereumComponent {
  amountToBuy: number = 0;
  ethereumPrice: number = 0;
  etherumAmount: number = 0;
  errorMessage: string = '';
  transactionSuccess: boolean = false;
  imageURL = '';

  sessionId: string = '';
  llocEvent: string = 'monedes';
  tipusEvent: string = 'click';

  balance = 0;
  userId: string | null = null;
  private intervalId: any;

  private walletService = inject(WalletService);
  private cryptoWalletService = inject(CryptoWalletService);
  private mediaService = inject(MediaService);
  private RegistreService = inject(RegistreService);
  private SessionService = inject(SessionService);

  constructor() {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');

    this.fetchImage();
    if (this.userId) {
      this.intervalId = setInterval(() => {
        this.fetchBalance();
        this.fetchEtherumBalance();
      }, 1000);
    }
  }


  fetchBalance() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }


    this.walletService.getBalance(this.userId).subscribe(
      (response: number) => {

        this.balance = parseFloat(response.toFixed(2));
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }

  fetchEtherumBalance() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }


    this.cryptoWalletService.getEthereumPrice().subscribe(
      (response: number) => {

        this.ethereumPrice = parseFloat(response.toFixed(2));
      },
      (error) => {
        console.error('Error fetching ethereum balance:', error);
      }
    );
  }

  private logClick(): void {
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

  buyEthereum() {
    this.sessionId = this.SessionService.getSessionId();
    this.logClick();

    if (this.amountToBuy <= 0 || this.amountToBuy > this.balance) {
      this.errorMessage = "No tens prou saldo per comprar aquesta quantitat.";
      this.transactionSuccess = false;
      return;
    }


    this.etherumAmount = this.amountToBuy / this.ethereumPrice;



    this.balance -= this.amountToBuy;

    if (this.userId) {
      this.walletService.updateBalance(this.userId, this.balance).subscribe({
        next: (response) => {
          this.transactionSuccess = true;
          this.errorMessage = '';

          setTimeout(() => {
            this.transactionSuccess = false;
          }, 2000);  // Es veura al gif per dos segons
        },
        error: (error) => {
          console.error('Error updating balance:', error);
          this.transactionSuccess = false;
          this.errorMessage = 'Error updating balance';
        }
      });
    }

    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      this.walletService.updateEthereumAmount(this.userId, this.etherumAmount).subscribe({
        next: (response) => {
          this.transactionSuccess = true;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error updating balance:', error);
          this.transactionSuccess = false;
          this.errorMessage = 'Error updating balance';
        }
      });
    } else {
      console.error('User ID is not available');
      this.transactionSuccess = false;
      this.errorMessage = 'User ID is not available';
    }

    this.errorMessage = '';
    this.transactionSuccess = true;

  }


  fetchImage() {
    this.mediaService.getEthereumGif().subscribe({
      next: (response: string) => {
        this.imageURL = response;
      },
      error: (error) => {
        console.error('Error fetching image:', error);
      }
    });
  }


}
