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

@Component({
  selector: 'app-monedes',
  standalone: true,
  imports: [FormsModule, BuybitcoinComponent, SellbitcoinComponent, BuyethereumComponent, SellethereumComponent, BuylitecoinComponent, SelllitecoinComponent],
  templateUrl: './monedes.component.html',
  styleUrl: './monedes.component.css'
})
export class MonedesComponent implements OnInit {
  ngOnInit() {
    this.showLoadingBar();
    setTimeout(() => this.hideLoadingBar(), 1500);
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
