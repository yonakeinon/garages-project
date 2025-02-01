import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

interface Garage {
  mispar_mosah: number;
  full_name: string;
  address?: string;
  city?: string;
  phone?: string;
}

@Component({
  selector: 'app-garage-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './garage-list.component.html',
  styles: [`
    .garage-container { padding: 20px; }
    table { width: 100%; margin-top: 20px; }
    .garage-select { width: 100%; margin-bottom: 20px; }
    button { margin-bottom: 20px; }
  `]
})
export class GarageListComponent implements OnInit {
  dataSource = new MatTableDataSource<Garage>([]);
  displayedColumns: string[] = ['name', 'address', 'city', 'phone'];
  isLoading = false;
  selectedGarages: Garage[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGarages();
  }

  loadGarages() {
    this.isLoading = true;
    this.http.get<Garage[]>('http://localhost:3000/api/garages').subscribe({
      next: (garages) => {
        if (garages.length === 0) {
          this.fetchGarages();
        } else {
          this.dataSource.data = garages;
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading garages:', error);
        this.isLoading = false;
      }
    });
  }

  fetchGarages() {
    this.http.get<Garage[]>('http://localhost:3000/api/garages/fetch').subscribe({
      next: (garages) => {
        this.dataSource.data = garages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching garages:', error);
        this.isLoading = false;
      }
    });
  }

  addSelectedGarages() {
    if (!this.selectedGarages.length) return;
    
    this.isLoading = true;
    const addRequests = this.selectedGarages.map(garage => 
      this.http.post<Garage>('http://localhost:3000/api/garages/add', garage)
    );

    import('rxjs').then(({ forkJoin }) => {
      forkJoin(addRequests).subscribe({
        next: () => {
          this.loadGarages();
          this.selectedGarages = [];
        },
        error: (error) => {
          console.error('Error adding garages:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    });
  }
}
