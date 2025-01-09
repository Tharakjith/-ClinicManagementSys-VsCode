import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Specialization } from '../model/specialization';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //List of patients
  patients: Patient[] = [];
  specializations: Specialization[] = [];
  formPatientData: Patient = new Patient();
  //Dob: any;

  constructor(private httpClient: HttpClient) { }

  // Get All Patients
  getAllPatients() : void
  {
    this.httpClient.get(environment.apiUrl + 'receptions') 
    .toPromise()
    .then((response?: any) =>{
      if(response.Value)
      {
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

  //3 - Department - Get all departments
  getAllSpecializations() : void
  {
    this.httpClient.get(environment.apiUrl + 'Specializations')
    .toPromise()
    .then((response?: any) =>{
      if(response.Value)
      {
        this.specializations = response.Value;
        console.log(this.specializations);
      }
    })
    .catch((error) => {
      console.log('Error occured: ',error);
    });
  }

  // Update an existing Patient
  updatePatient(patient: Patient): Observable<any> {
    console.log("Update: In service");
    return this.httpClient.put(environment.apiUrl + 'receptions/' + patient.PatientId, patient);
  }
}
