import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { doesNotReject } from 'node:assert';
import { Doctors } from '../model/doctors';
import { Specialization } from '../model/specialization';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  // List of staffs and departments
  doctors: Doctors[] = [];
  specialization: Specialization[] = [];
  formDoctorsData: Doctors = new Doctors();
  users: User[] = [];
  

  constructor(private httpClient: HttpClient) {}
///1- Get All Employees
getAllDoctors(): void {
  this.httpClient.get(environment.apiUrl + 'Doctors')

    .toPromise()
    .then((response?: any) => {
      if (response.Value) {
        this.doctors = response.Value;
        console.log(this.doctors);
      }
    })
    .catch((error) => {
      console.log('Error occured:', error);
    });
}
// 2- Insert employee
insertDoctors(doctors:Doctors): Observable<any>{
  console.log("Insert: In Service");
  console.log(doctors);
  return this.httpClient.post(environment.apiUrl+'Doctors',doctors);
  }

// 3. Get all departments
getAllSpecialization(): void {
  this.httpClient.get(environment.apiUrl + 'Doctors/v2')
    .toPromise()
    .then((response?: any) => {
      if (response.Value) {
        this.specialization= response.Value;
        console.log(this.specialization);
      }
    })
    .catch((error) => {
      console.log('Error occured:', error);
    });
}

// 3. Get all departments
getAllUsers(): void {
  this.httpClient.get(environment.apiUrl + 'Doctors/v5')
    .toPromise()
    .then((response?: any) => {
      if (response.Value) {
        this.users= response.Value;
        console.log(this.users);
      }
    })
    .catch((error) => {
      console.log('Error occured:', error);
    });
}


// 4. Update a staff
UpdateDoctors(doctors:Doctors):Observable<any>{
  console.log("Update : In service");
  return this.httpClient.put(environment.apiUrl+'doctors/'+doctors.DoctorId,doctors);
}
}










  