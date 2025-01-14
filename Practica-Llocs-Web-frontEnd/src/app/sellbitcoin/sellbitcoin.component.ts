import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';
import { CommonModule } from '@angular/common';
import { MediaService } from '../services/media.service';


@Component({
  selector: 'app-sellbitcoin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sellbitcoin.component.html',
  styleUrl: './sellbitcoin.component.css'
})
export class SellbitcoinComponent {


  amountToSell: number = 0;
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
        this.fetchBitcoinPrice();
        this.fetchBitcoinAmount();
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
        this.balance = response;
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }

  fetchBitcoinAmount() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getBitcoinAmount(this.userId).subscribe(
      (response: number) => {
        this.bitcoinAmount = parseFloat(response.toFixed(6));
      },
      (error) => {
        console.error('Error fetching Bitcoin amount:', error);
      }
    );
  }

  fetchBitcoinPrice() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.cryptoWalletService.getBitcoinPrice().subscribe(
      (response: number) => {
        this.bitcoinPrice = response;
      },
      (error) => {
        console.error('Error fetching Bitcoin price:', error);
      }
    );
  }



  sellBitcoin() {
    if (this.amountToSell <= 0 || this.amountToSell > this.bitcoinAmount) {
      this.errorMessage = "No tens prou Bitcoin per vendre aquesta quantitat.";
      this.transactionSuccess = false;
      return;
    }

    const amountInEur = this.amountToSell * this.bitcoinPrice;

    this.balance += amountInEur;
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

    this.bitcoinAmount -= this.amountToSell;
    if (this.userId) {
      this.walletService.updateBitcoinAmount(this.userId, this.bitcoinAmount).subscribe({
        next: (response) => {
          this.transactionSuccess = true;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error updating Bitcoin amount:', error);
          this.transactionSuccess = false;
          this.errorMessage = 'Error updating Bitcoin amount';
        }
      });
    } else {
      console.error('User ID is not available');
      this.transactionSuccess = false;
      this.errorMessage = 'User ID is not available';
    }
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
