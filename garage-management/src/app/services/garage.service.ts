import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garage } from '../models/garage.model';

@Injectable({
    providedIn: 'root'
})
export class GarageService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    getGarages(): Observable<Garage[]> {
        return this.http.get<Garage[]>(`${this.apiUrl}/garages`);
    }

    addGarages(garages: Garage[]): Observable<Garage[]> {
        return this.http.post<Garage[]>(`${this.apiUrl}/garages`, garages);
    }
}