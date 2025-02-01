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
  mispar_mosah: string;
  full_name: string;
  address: string;
  city: string;
  phone: string;
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
  availableGarages: Garage[] = [];
  selectedGarages: Garage[] = [];
  displayedColumns: string[] = ['name', 'address', 'city', 'phone'];
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAllGarages();
  }

  loadAllGarages() {
    this.isLoading = true;
    console.log('Loading all garages');

    // Load all garages for the table
    this.http.get<Garage[]>('http://localhost:3000/api/garages').subscribe({
      next: (garages) => {
        console.log('All garages loaded:', garages);
        this.dataSource.data = garages;

        // Load available garages for multi-select
        this.loadAvailableGarages();
      },
      error: (error) => {
        console.error('Error loading garages:', error);
        this.isLoading = false;
      }
    });
  }

  loadAvailableGarages() {
    this.http.get<Garage[]>('http://localhost:3000/api/garages/fetch').subscribe({
      next: (allGarages) => {
        const tableIds = new Set(this.dataSource.data.map(g => g.mispar_mosah));
        this.availableGarages = allGarages.filter(g => !tableIds.has(g.mispar_mosah));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading available garages:', error);
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
          this.loadAllGarages(); // Reload all garages after adding
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
