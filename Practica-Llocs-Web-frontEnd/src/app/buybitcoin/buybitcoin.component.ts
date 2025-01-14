import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';
import { CommonModule } from '@angular/common';
import { MediaService } from '../services/media.service';
@Component({
  selector: 'app-buybitcoin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './buybitcoin.component.html',
  styleUrl: './buybitcoin.component.css'
})
export class BuybitcoinComponent {
  amountToBuy: number = 0;
  bitcoinPrice: number = 0;
  bitcoinAmount: number = 0;
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
        this.fetchBitcoinBalance();
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


  fetchBitcoinBalance() {

    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }


    this.cryptoWalletService.getBitcoinPrice().subscribe(
      (response: number) => {
        this.bitcoinPrice = response;
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }

  buyBitcoin() {
    if (this.amountToBuy <= 0 || this.amountToBuy > this.balance) {
      this.errorMessage = "No tens prou saldo per comprar aquesta quantitat.";
      this.transactionSuccess = false;
      return;
    }


    this.bitcoinAmount = this.amountToBuy / this.bitcoinPrice;

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
      this.walletService.updateBitcoinAmount(this.userId, this.bitcoinAmount).subscribe({
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
    this.mediaService.getBitcoinGif().subscribe({
      next: (response: string) => {
        this.imageURL = response;
      },
      error: (error) => {
        console.error('Error fetching image:', error);
      }
    });
  }

}
