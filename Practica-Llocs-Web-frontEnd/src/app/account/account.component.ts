import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../login/login.component";
import { SignupComponent } from "../signup/signup.component";
import { LogoutComponent } from "../logout/logout.component";
import { CurrentuserComponent } from "../currentuser/currentuser.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, LoginComponent, SignupComponent, LogoutComponent, CurrentuserComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  showSignup: boolean = false;

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
