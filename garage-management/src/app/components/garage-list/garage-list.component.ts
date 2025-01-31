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
    
    this.http.get<Garage[]>('http://localhost:3000/api/garages').subscribe({
      next: (storedGarages) => {
        console.log('Stored garages:', storedGarages);
        this.dataSource.data = storedGarages || [];
        
        this.http.get<Garage[]>('http://localhost:3000/api/garages/fetch').subscribe({
          next: (allGarages) => {
            console.log('All garages:', allGarages);
            if (!allGarages || allGarages.length === 0) {
              console.warn('No garages received from fetch endpoint');
              this.availableGarages = [];
              this.isLoading = false;
              return;
            }
            
            const existingIds = new Set(storedGarages.map(g => g.mispar_mosah));
            this.availableGarages = allGarages.filter(g => !existingIds.has(g.mispar_mosah));
            console.log('Available garages for multi-select:', this.availableGarages);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching available garages:', error);
            this.availableGarages = [];
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error loading stored garages:', error);
        this.dataSource.data = [];
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
          this.loadAllGarages();
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
