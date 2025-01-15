import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../login/login.component";
import { SignupComponent } from "../signup/signup.component";
import { LogoutComponent } from "../logout/logout.component";
import { CurrentuserComponent } from "../currentuser/currentuser.component";
import { RegistreService } from '../services/registre.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, LoginComponent, SignupComponent, LogoutComponent, CurrentuserComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  showSignup: boolean = false;


    constructor() {}
    sessionId: string = '';
    userId: string | null = null;
    llocEvent: string = 'compte';
    tipusEvent: string = 'visita';

    private RegistreService = inject(RegistreService);

    ngOnInit() {
      if (localStorage.getItem('sessionId')) {
        this.sessionId = localStorage.getItem('sessionId')!;
      } else {
        this.sessionId = this.generateSessionId();
      }
      this.logVisit();
    }

    private generateSessionId(): string {
      const sessionId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);
      return sessionId;
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


  toggleSignup(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.showSignup = !this.showSignup;
  }

  onSignupSuccess() {
    this.showSignup = false; // Cerrar el pop-up
  }
}
