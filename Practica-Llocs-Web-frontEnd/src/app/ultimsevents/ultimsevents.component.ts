import { Component, inject } from '@angular/core';
import { RegistreService } from '../services/registre.service';

@Component({
  selector: 'app-ultimsevents',
  standalone: true,
  imports: [],
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
