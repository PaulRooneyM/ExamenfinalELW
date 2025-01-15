import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistreService } from '../services/registre.service';
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

  ngOnInit() {
    this.sessionId = this.generateSessionId();
    this.logVisit();
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private logVisit(): void {
    console.log(`Page visited at: ${new Date().toISOString()}, Session ID: ${this.sessionId}`);
    this.RegistreService.createRegistre({ sessionId: this.sessionId }).subscribe(
      (response: any) => {
        console.log('Visit logged successfully:', response);
      },
      (error) => {
        console.error('Error logging visit:', error);
      }
    );

  }


}
