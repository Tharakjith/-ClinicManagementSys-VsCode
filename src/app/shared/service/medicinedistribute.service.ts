import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medicinedistribute } from '../model/medicinedistribute';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicinedistributeService {
  formMedicinedistributeData: Medicinedistribute = new Medicinedistribute();

  constructor(private httpClient: HttpClient) {}

  getPrescriptionDetails(prescriptionId: number): Observable<Medicinedistribute> {
    return this.httpClient.get<any>(`${environment.apiUrl}pharmacists/vm3/${prescriptionId}`)
      .pipe(
        map(response => {
          const distribution = new Medicinedistribute();
          distribution.PrescriptionId = prescriptionId;
          distribution.MedicineId = response.MedicineId;
          distribution.PatientName = response.PatientName;
          distribution.MedicineName = response.MedicineName;
          distribution.Dosage = response.Dosage;
          distribution.Frequency = response.Frequency;
          distribution.NumberofDays = response.NumberofDays;
          distribution.StockInHand = response.StockInHand;
          return distribution;
        })
      );
  }

  insertMedicineDistribute(distribution: any): Observable<any> {
    // Ensure all required fields are included in the request
    const payload = {
      PrescriptionId: Number(distribution.PrescriptionId),
      MedicineId: Number(distribution.MedicineId),
      QuantityDistributed: Number(distribution.QuantityDistributed),
      DistributionDate: distribution.DistributionDate,
      MedStatusId: Number(distribution.MedStatusId)
    };

    console.log('Service sending payload:', payload);
    return this.httpClient.post(`${environment.apiUrl}pharmacists/md`, payload);
  }
}