import { Component } from '@angular/core';
import { GarageListComponent } from './components/garage-list/garage-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [GarageListComponent] // ✅ Make sure it is imported
})
export class AppComponent {}
