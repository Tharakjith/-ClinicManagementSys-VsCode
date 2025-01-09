import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Specialization } from '../model/specialization';
import { Doctors } from '../model/doctors';
// import { Availability } from '../model/availability';
// import { Appointment } from '../model/appointment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //List of patients
  patients: Patient[] = [];
  specializations: Specialization[] = [];
  doctors: Doctors[] = [];
  // availabilities: Availability[] = [];
  // frmAppointment: Appointment = new Appointment();
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

  // getAllSpecializations(): Observable<Specialization[]> {
  //   return this.httpClient.get<Specialization[]>
  //   (${environment.apiUrl}Specializations);
  // }

  // getDoctorsBySpecialization(specializationId: number): Observable<Doctors[]> {
  //   return this.httpClient.get<Doctors[]>
  //   (${environment.apiUrl}Doctors/${specializationId});
  // }

  // getDoctorAvailability(doctorId: number): Observable<Availability[]> {
  //   return this.httpClient.get<Availability[]>
  //   (${environment.apiUrl}DoctorAvailability/${doctorId});
  // }

  // generateToken(doctorId: number, appointmentDate: string, timeSlotId: number): Observable<number> {
  //   return this.httpClient.get<number>
  //   (${environment.apiUrl}generatetoken/${doctorId}/${appointmentDate}/${timeSlotId});
  // }

  // bookAppointment(appointment: Appointment): Observable<any> {
  //   return this.httpClient.post(${environment.apiUrl}Bookappointment, appointment);
  // }

}