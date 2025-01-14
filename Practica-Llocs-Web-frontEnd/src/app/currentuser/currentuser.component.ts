import { Component, inject, Output, EventEmitter } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currentuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currentuser.component.html',
  styleUrl: './currentuser.component.css'
})
export class CurrentuserComponent {

  userName: string = '';
  userId: string | null = null;
  private intervalId: any;

  private walletService = inject(WalletService);

  ngOnInit() {
    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      this.intervalId = setInterval(() => {
        this.fetchUserName();
      }, 1000);
    }
  }

  fetchUserName() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getUserName(this.userId).subscribe(
      (response: string) => {
        this.userName = response;
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }
}
