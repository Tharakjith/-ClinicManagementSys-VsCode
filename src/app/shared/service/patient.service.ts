import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { Specialization } from '../model/specialization';
import { Doctors } from '../model/doctors';
import { Availability } from '../model/availability';
import { Appointment } from '../model/appointment';
import { Doctorbyspectn } from '../model/doctorbyspectn';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //List of patients
  patients: Patient[] = [];
  specializations: Specialization[] = [];
  doctors: Doctors[] = [];
  doctorspec : Doctorbyspectn[] = [];
  availabilities: Availability[] = [];
  frmAppointment: Appointment = new Appointment();
  formPatientData: Patient = new Patient();

  //Dob: any;

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
  insertPatient(patient: Patient): Observable<any> {
    console.log("Insert: In service"); // https://localhost:7201/api/receptions
    return this.httpClient.post(environment.apiUrl + 'receptions', patient);
  }

  // Update an existing Patient
  updatePatient(patient: Patient): Observable<any> {
    console.log("Update: In service");
    return this.httpClient.put(environment.apiUrl + 'receptions/' + patient.PatientId, patient);
  }

  //Specializations
  getAllSpecializations(): Observable<Specialization[]> {
    return this.httpClient.get<any>(`${environment.apiUrl}receptions/specializations`).pipe(
      map((response: any) => response.Value || []), // Extract 'Value'
      catchError((error) => {
        console.error('Error fetching specializations:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  // getDoctorsBySpecialization(specializationId: number): Observable<Doctors[]> {
  //   return this.httpClient.get<Doctors[]>
  //   (`${environment.apiUrl}receptions/Doctors/${specializationId}`);
  // }
  getDoctorsBySpecialization(specializationId: number): Observable<Doctorbyspectn[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}receptions/Doctors/${specializationId}`).pipe(
      map((response) => {
        // Map API response to the Doctors model
        return response.map((doc) => {
          const doctorspeci = new Doctorbyspectn();
          doctorspeci.DoctorId = doc.DoctorId;
          doctorspeci.users.staff.StaffName = doc.DoctorName; // Map DoctorName to StaffName
          doctorspeci.specialization.SpecializationName = doc.SpecializationName; // SpecializationName
          doctorspeci.ConsultationFee = doc.ConsultationFee;
          return doctorspeci;
        });
      }),
      catchError((error) => {
        console.error('Error fetching doctors:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
  

  getDoctorAvailability(doctorId: number): Observable<Availability[]> {
    return this.httpClient.get<Availability[]>
    (`${environment.apiUrl}receptions/DoctorAvailability/${doctorId}`);
  }

  getConsultationFeeByDoctorId(doctorId: number): Observable<number> {
    return this.httpClient.get<number>
    (`${environment.apiUrl}receptions/doctor/${doctorId}/consultation-fee`);
  }

  generateToken(doctorId: number, appointmentDate: string, timeSlotId: number): Observable<number> {
    return this.httpClient.get<number>
    (`${environment.apiUrl}receptions/generatetoken/${doctorId}/${appointmentDate}/${timeSlotId}`);
  }

  bookAppointment(appointment: Appointment): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}receptions/Bookappointment`, appointment);
  }
}
