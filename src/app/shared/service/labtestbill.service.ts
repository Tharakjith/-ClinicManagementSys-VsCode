import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Labtestbill } from '../model/labtestbill';

@Injectable({
    providedIn: 'root'
})
export class LabtestbillService {
    private apiUrl = `${environment.apiUrl}/api/labtest`;

    constructor(private http: HttpClient) { }

    getAllLabtestBills(): Observable<Labtestbill[]> {
        return this.http.get<Labtestbill[]>(`${this.apiUrl}/vm1`);
    }

    calculateGST(amount: number): number {
        return amount * 0.18; // 18% GST
    }

    calculateGrandTotal(amount: number): number {
        const gst = this.calculateGST(amount);
        return amount + gst;
    }

    generatePDF(billData: any): void {
        // Implementation for PDF generation will go here
        // You might want to use libraries like jsPDF or pdfmake
    }
}