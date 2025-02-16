import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { Specialization } from '../model/specialization';
import { Doctorbyspectn } from '../model/doctorbyspectn';
import { Doctoravail } from '../model/doctoravail';
import { Appointment } from '../model/appointment';
import { Patientbill } from '../model/patient-bill';


@Injectable({
  providedIn: 'root'
})

export class PatientService {
  patients: Patient[] = [];
  billDetails: Patientbill | null = null;
  formPatientData: Patient = new Patient();

  constructor(private httpClient: HttpClient) { }

  // Get All Patients
  getAllPatients(): void {
    this.httpClient.get(environment.apiUrl + 'receptions')
      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.patients = response.Value;
          console.log(this.patients);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Insert a new Patient
  // insertPatient(patient: Patient): Observable<any> {
  //   console.log("Insert: In service");
  //   return this.httpClient.post(environment.apiUrl + 'receptions', patient);
  // }
  insertPatient(patient: Patient): Observable<any> {
    console.log("Insert: In service with data:", patient);
    return this.httpClient.post(`${environment.apiUrl}receptions`, patient)
      .pipe(
        map((response: any) => {
          console.log("Service received response:", response);
          // Handle both possible response formats
          if (response.Value) {
            return response.Value;
          }
          return response;
        })
      );
  }



  // Update an existing Patient
  updatePatient(patient: Patient): Observable<any> {
    console.log("Update: In service");
    return this.httpClient.put(environment.apiUrl + 'receptions/' + patient.PatientId, patient);
  }

  getAllSpecializations(): Observable<Specialization[]> {
    return this.httpClient.get<any>(`${environment.apiUrl}receptions/specializations`).pipe(
      map((response: any) => response.Value || []),
      catchError((error) => {
        console.error('Error fetching specializations:', error);
        return of([]);
      })
    );
  }

  getDoctorsBySpecialization(specializationId: number): Observable<Doctorbyspectn[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}receptions/Doctors/${specializationId}`).pipe(
      map((response) => {
        return response.map((doc) => {
          const doctorSpec = new Doctorbyspectn();
          doctorSpec.DoctorId = doc.DoctorId;
          doctorSpec.DoctorName = doc.DoctorName;
          doctorSpec.SpecializationName = doc.SpecializationName;
          doctorSpec.ConsultationFee = doc.ConsultationFee;
          doctorSpec.DoctorIsActive = true;
          return doctorSpec;
        });
      }),
      catchError((error) => {
        console.error('Error fetching doctors:', error);
        return of([]);
      })
    );
  }

  getDoctorAvailability(doctorId: number): Observable<Doctoravail[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}receptions/DoctorAvailability/${doctorId}`).pipe(
      map((response) => {
        return response.map((avail) => {
          const availability = new Doctoravail();
          availability.AvailabilityId = avail.AvailabilityId;
          availability.TimeSlotId = avail.TimeSlotId;
          availability.Session = avail.Session;
          availability.StartTime = avail.StartTime;
          availability.EndTime = avail.EndTime;
          availability.Weekday = avail.Weekday;
          return availability;
        });
      }),
      catchError((error) => {
        console.error('Error fetching availability:', error);
        return of([]);
      })
    );
  }

  getConsultationFeeByDoctorId(doctorId: number): Observable<number> {
    return this.httpClient.get<number>(`${environment.apiUrl}receptions/doctor/${doctorId}/consultation-fee`);
  }

  generateToken(doctorId: number, appointmentDate: string, timeSlotId: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}receptions/generatetoken/${doctorId}/${appointmentDate}/${timeSlotId}`
    );
  }

  getPatientBill(patientId: number): Observable<Patientbill> {
    return this.httpClient.get<Patientbill>(`${environment.apiUrl}receptions/bill/${patientId}`);
  }

  bookAppointment(appointmentData: any): Observable<any> {
    console.log('Sending appointment data:', appointmentData);
    return this.httpClient.post(`${environment.apiUrl}receptions/Bookappointment`, appointmentData)
      .pipe(
        catchError(error => {
          console.error('Booking error in service:', error);
          throw error;
        })
      );
  }

}