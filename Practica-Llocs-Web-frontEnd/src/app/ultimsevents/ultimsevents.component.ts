import { Component, inject } from '@angular/core';
import { RegistreService } from '../services/registre.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ultimsevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ultimsevents.component.html',
  styleUrl: './ultimsevents.component.css'
})
export class UltimseventsComponent {

  constructor() {}
  events: any[] = [];

  private RegistreService = inject(RegistreService);

  ngOnInit() {
    this.RegistreService.getRegistres().subscribe(events => {
      console.log(events);
      this.events = events;
    });
  }
}
