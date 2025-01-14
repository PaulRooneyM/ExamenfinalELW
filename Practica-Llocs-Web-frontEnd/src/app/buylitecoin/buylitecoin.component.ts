import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';
import { MediaService } from '../services/media.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buylitecoin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './buylitecoin.component.html',
  styleUrl: './buylitecoin.component.css'
})
export class BuylitecoinComponent {

  amountToBuy: number = 0;
  litecoinPrice: number = 0;
  litecoinAmount: number = 0;
  errorMessage: string = '';
  transactionSuccess: boolean = false;
  imageURL: string = '';


  balance = 0;
  userId: string | null = null;
  private intervalId: any;

  private walletService = inject(WalletService);
  private cryptoWalletService = inject(CryptoWalletService);
  private mediaService = inject(MediaService);

  constructor() {}


  ngOnInit() {

    this.userId = localStorage.getItem('userId');

    this.fetchImage();
    if (this.userId) {
      this.intervalId = setInterval(() => {
        this.fetchBalance();
        this.fetchLitecoinBalance();
      }, 1000);
    }
  }

  // Obtener balance del usuario
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

  // Obtener balance de Litecoin
  fetchLitecoinBalance() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.cryptoWalletService.getLitecoinPrice().subscribe(
      (response: number) => {
        this.litecoinPrice = parseFloat(response.toFixed(6));
      },
      (error) => {
        console.error('Error fetching litecoin balance:', error);
      }
    );
  }

  // Comprar Litecoin
  buyLitecoin() {
    if (this.amountToBuy <= 0 || this.amountToBuy > this.balance) {
      this.errorMessage = "No tens prou saldo per comprar aquesta quantitat.";
      this.transactionSuccess = false;
      return;
    }


    this.litecoinAmount = this.amountToBuy / this.litecoinPrice;

    this.balance -= this.amountToBuy;

    if (this.userId) {
      this.walletService.updateBalance(this.userId, this.balance).subscribe({
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
    }

    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      this.walletService.updateLitecoinAmount(this.userId, this.litecoinAmount).subscribe({
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
    } else {
      console.error('User ID is not available');
      this.transactionSuccess = false;
      this.errorMessage = 'User ID is not available';
    }

    this.errorMessage = '';
    this.transactionSuccess = true;

  }

  fetchImage() {
    this.mediaService.getLitecoinGif().subscribe({
      next: (response: string) => {
        this.imageURL = response;
      },
      error: (error) => {
        console.error('Error fetching image:', error);
      }
    });
  }


}
