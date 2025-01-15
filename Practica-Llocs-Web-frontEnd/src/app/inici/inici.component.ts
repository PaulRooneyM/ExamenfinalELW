import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistreService } from '../services/registre.service';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-inici',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './inici.component.html',
  styleUrl: './inici.component.css'
})
export class IniciComponent {
  constructor() {}
  sessionId: string = '';
  userId: string | null = null;
  llocEvent: string = 'inici';
  tipusEvent: string = 'visita';

  private RegistreService = inject(RegistreService);
  private SessionService = inject(SessionService);

  ngOnInit() {
    this.sessionId = this.SessionService.getSessionId();
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


}
