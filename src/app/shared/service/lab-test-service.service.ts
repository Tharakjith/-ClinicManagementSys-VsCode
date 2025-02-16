import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Labtestreport } from '../model/labtestreport';
import { Todaylabtest } from '../model/todaylabtest';

@Injectable({
  providedIn: 'root'
})
export class LabTestServiceService {

  constructor(private httpClient: HttpClient) { }

  getTodaysPrescribedTests(): Observable<Todaylabtest[]> {
    return this.httpClient.get<Todaylabtest[]>(`${environment.apiUrl}NewLabtests/today-prescribed-tests`);
  }

  getReportDetails(reportId: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}NewLabtests/report-details/${reportId}`);
  }

  getLabTestDetails(labTestId: number): Observable<Todaylabtest> {
    return this.httpClient.get<Todaylabtest>(`${environment.apiUrl}NewLabtests/lab-test-details/${labTestId}`);
  }
  
  createLabReport(report: Labtestreport): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}NewLabtests/create-report`, report);
  }

  generateBill(reportId: number): Observable<Blob> {
    return this.httpClient.get(`${environment.apiUrl}NewLabtests/generate-bill/${reportId}`, {
      responseType: 'blob'
    });
  }

  // getReportDetails(reportId: number): Observable<any> {
  //   return this.httpClient.get(${environment.apiUrl}NewLabtests/report-details/${reportId});
  // }


  getBillDetails(reportId: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}NewLabtests/bill-details/${reportId}`);
  }
  
}