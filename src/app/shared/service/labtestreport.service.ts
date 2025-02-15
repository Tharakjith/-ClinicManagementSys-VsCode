
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Labtestreport } from '../model/labtestreport';

@Injectable({
    providedIn: 'root'
})
export class LabtestreportService {
    private apiUrl = `${environment.apiUrl}labtestLists`;

    constructor(private http: HttpClient) { }


    getLabTestReportById(id: number): Observable<Labtestreport> {
        return this.http.get<Labtestreport>(`${this.apiUrl}/GetLabTestsForToday/${id}`);
    }

    updateLabTestReport(id: number, report: Labtestreport): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, report);
    }

    generateBill(reportId: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/generate-bill/${reportId}`, {});
    }
}