import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todaylabtest } from '../model/todaylabtest';

@Injectable({
    providedIn: 'root'
})
export class LabTestService {
    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    getTodaysPrescribedTests(): Observable<Todaylabtest[]> {
        return this.http.get<Todaylabtest[]>(`${this.apiUrl}labtestLists/today-prescribed-tests`);
    }

 
}