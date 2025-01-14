import { Component, inject } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  // Variables de estado
  balance = 0;
  userId: string | null = null;
  bitcoinAmount: number = 0;
  ethereumAmount: number = 0;
  litecoinAmount: number = 0;
  bitcoinValue: number = 0;
  ethereumValue: number = 0;
  litecoinValue: number = 0;
  userBitcoinValue: number = 0;
  userEthereumValue: number = 0;
  userLitecoinValue: number = 0;
  totalNetWorth: number = 0;
  private intervalId: any;

  // Inyección de servicios
  private walletService = inject(WalletService);
  private cryptoWalletService = inject(CryptoWalletService);

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.showLoadingBar();
    setTimeout(() => this.hideLoadingBar(), 150);

    if (this.userId) {
      this.intervalId = setInterval(() => {
        this.fetchBalance();
        this.fetchBitcoinAmount();
        this.fetchBitcoinValue();
        this.fetchEthereumAmount();
        this.fetchEthereumValue();
        this.fetchLitecoinAmount();
        this.fetchLitecoinValue();
        this.calculateNetWorth();
      }, 1000);
    }
  }

  // Mostrar barra de carga
  showLoadingBar() {
    const loader = document.querySelector('.loader') as HTMLElement;
    if (loader) {
      loader.style.display = 'block';
    }
  }

  // Ocultar barra de carga
  hideLoadingBar() {
    const loader = document.querySelector('.loader') as HTMLElement;
    const container = document.querySelector('.crypto-container') as HTMLElement;
    if (loader && container) {
      loader.style.display = 'none';
      container.style.display = 'block';
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

  // Obtener valor del Bitcoin
  fetchBitcoinValue() {
    this.cryptoWalletService.getBitcoinPrice().subscribe(
      (response: number) => {
        this.bitcoinValue = response;
      },
      (error) => {
        console.error('Error fetching bitcoin value:', error);
      }
    );
  }

  // Obtener valor del Ethereum
  fetchEthereumValue() {
    this.cryptoWalletService.getEthereumPrice().subscribe(
      (response: number) => {
        this.ethereumValue = response;
      },
      (error) => {
        console.error('Error fetching Ethereum value:', error);
      }
    );
  }

  // Obtener valor del Litecoin
  fetchLitecoinValue() {
    this.cryptoWalletService.getLitecoinPrice().subscribe(
      (response: number) => {
        this.litecoinValue = response;
      },
      (error) => {
        console.error('Error fetching Litecoin value:', error);
      }
    );
  }

  // Obtener cantidad de Bitcoin del usuario
  fetchBitcoinAmount() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getBitcoinAmount(this.userId).subscribe(
      (response: number) => {
        this.bitcoinAmount = response;
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
    this.userBitcoinValue = parseFloat((this.bitcoinAmount * this.bitcoinValue).toFixed(2));
  }

  // Obtener cantidad de Ethereum del usuario
  fetchEthereumAmount() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getEthereumAmount(this.userId).subscribe(
      (response: number) => {
        this.ethereumAmount = response;
      },
      (error) => {
        console.error('Error fetching Ethereum amount:', error);
      }
    );
    this.userEthereumValue = parseFloat((this.ethereumAmount * this.ethereumValue).toFixed(2));
  }

  // Obtener cantidad de Litecoin del usuario
  fetchLitecoinAmount() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getLitecoinAmount(this.userId).subscribe(
      (response: number) => {
        this.litecoinAmount = response;
      },
      (error) => {
        console.error('Error fetching Litecoin amount:', error);
      }
    );
    this.userLitecoinValue = parseFloat((this.litecoinAmount * this.litecoinValue).toFixed(2));
  }

  // Calcular el valor neto total del usuario
  calculateNetWorth() {
    this.totalNetWorth = parseFloat((this.balance + this.userBitcoinValue + this.userEthereumValue+ this.userLitecoinValue).toFixed(2));
  }

  // El formulari de depositar o retirar diners
  onSubmit(event: any) {
    const transactionType = event.target.querySelector('#transactionType').value;
    const amount = parseFloat(event.target.querySelector('#amount').value);

    const confirmation = confirm(`Esteu segur que voleu fer l'operació de ${transactionType} per un valor de ${amount} €?`);
    if (!confirmation) {
      return false;
    }

    if (transactionType === 'depositar') {
      this.balance += amount;
      if (this.userId) {
        this.walletService.updateBalance(this.userId, this.balance).subscribe(
          (response) => {
            alert(`Dipositat: $${amount}`);
          },
          (error) => {
            console.error('Error updating balance:', error);
            alert('An error occurred while updating the balance.');
          }
        );
      }


    } else if (transactionType === 'retirar') {
      if (amount <= this.balance) {
        this.balance -= amount;
        // Actualizar balance en el servidor
        if (this.userId) {
          this.walletService.updateBalance(this.userId, this.balance).subscribe(
            (response) => {
              alert(`Retirat: $${amount}`);
            },
            (error) => {
              console.error('Error updating balance:', error);
              alert('An error occurred while updating the balance.');
            }
          );
        }
      } else {
        alert('No tens prou saldo.');
      }
    }
    return false;
  }



}
