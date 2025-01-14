import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';
import { MediaService } from '../services/media.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sellethereum',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sellethereum.component.html',
  styleUrl: './sellethereum.component.css'
})
export class SellethereumComponent {

  amountToSell: number = 0;
  ethereumPrice: number = 0;
  ethereumAmount: number = 0;
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
        this.fetchEthereumPrice();
        this.fetchEthereumAmount();
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

  fetchEthereumAmount() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getEthereumAmount(this.userId).subscribe(
      (response: number) => {
        this.ethereumAmount = parseFloat(response.toFixed(6));
      },
      (error) => {
        console.error('Error fetching Bitcoin amount:', error);
      }
    );
  }


  fetchEthereumPrice() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.cryptoWalletService.getBitcoinPrice().subscribe(
      (response: number) => {
        this.ethereumPrice = response;
      },
      (error) => {
        console.error('Error fetching Bitcoin price:', error);
      }
    );
  }

  sellEthereum() {
    if (this.amountToSell <= 0 || this.amountToSell > this.ethereumAmount) {
      this.errorMessage = "No tens prou Bitcoin per vendre aquesta quantitat.";
      this.transactionSuccess = false;
      return;
    }

    const amountInEur = this.amountToSell * this.ethereumPrice;

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

    this.ethereumAmount -= this.amountToSell;
    if (this.userId) {
      this.walletService.updateEthereumAmount(this.userId, this.ethereumAmount).subscribe({
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
