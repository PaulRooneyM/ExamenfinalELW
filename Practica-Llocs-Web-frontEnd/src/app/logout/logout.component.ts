import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor() { }

  // Manejar el cierre de sesión
  logout() {
    localStorage.removeItem('userId');

    alert("S'ha tancat la sessió correctament");
    window.location.reload();
  }
}
