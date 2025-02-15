// medicinebill.service.ts
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medicinebill } from '../model/medicinebill';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicinebillService {
  medicinebill: Medicinebill = new Medicinebill();

  constructor(private httpClient: HttpClient) { }

  getBillDetails(prescriptionId: number): Observable<Medicinebill> {
    return this.httpClient.get<Medicinebill>(`${environment.apiUrl}pharmacists/GetBillDetails/${prescriptionId}`);
  }

  generatePDF(billData: Medicinebill): void {
    // Create simple bill content
    const billContent = `
                            MEDICINE BILL
    ================================================
    
    Bill Date: ${new Date(billData.BillDateTime).toLocaleDateString()}
    Prescription ID: ${billData.PrescriptionId}
    
    Patient Details:
    --------------
    Patient ID: ${billData.PatientId}
    Patient Name: ${billData.PatientName}
    
    Medicine Details:
    ---------------
    Medicine Name: ${billData.MedicineName}
    Dosage: ${billData.Dosage}
    Frequency: ${billData.Frequency}
    Number of Days: ${billData.NumberOfDays}
    
    Billing Details:
    --------------
    Base Amount: Rs. ${billData.Cost.toFixed(2)}
    GST (10%): Rs. ${(billData.Cost * 0.1).toFixed(2)}
    Total Amount: Rs. ${(billData.Cost + billData.Cost * 0.1).toFixed(2)}
    
    ================================================
    Thank you for your visit!
    `;

    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MedicineBill_${billData.PrescriptionId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  deleteBill(prescriptionId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}medicinebills/${prescriptionId}`);
  }
}