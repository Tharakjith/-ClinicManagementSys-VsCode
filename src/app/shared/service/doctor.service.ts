import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StartDiagnosy } from '../model/start-diagnosy';
import { AppoinmentpatientViewmodel } from '../model/appoinmentpatient-viewmodel';
import { Appoinment } from '../model/appoinment';
import { Doctor } from '../model/doctor';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  getAllDiagnosys() {
    throw new Error('Method not implemented.');
  }
  //declare some variables
  //List of Employees
  startDiagnosys: StartDiagnosy[] = [];
  doctors:Doctor[]=[];
  formDiagnosysData: StartDiagnosy= new StartDiagnosy();
  appoinment: Appoinment[] = [];
  appoinmentpatientViewmodel: AppoinmentpatientViewmodel[] = [];
  formappoinment: AppoinmentpatientViewmodel = new AppoinmentpatientViewmodel();
  DateOfJoining: any;

  //DI:HTTP CLIENT

  constructor(private httpClient: HttpClient) { }

  //1-Get all Employees
  getAllAppoinment(): void {
    this.httpClient.get(environment.apiUrl + 'viewPatientAppoinment/todaysAppointments/{doctorId}')
      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.appoinmentpatientViewmodel = response.Value;
          console.log(this.appoinmentpatientViewmodel);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Insert Employee
  insertDiagnosys(doctor:StartDiagnosy): Observable<any>{
  console.log("Insert In service ");
  return this.httpClient.post(environment.apiUrl + 'StartDiagnosys',
      doctor);
   }
  //Get All Departmnets
  getAllAppoinments(): void {
    this.httpClient.get(environment.apiUrl + 'viewPatientAppoinment/todaysAppointments/{doctorId}')
      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.appoinmentpatientViewmodel = response.Value;
          console.log(this.appoinmentpatientViewmodel);
        }

      })
      .catch((error) => {
        console.log('Error Occured:', error);
      })
  }
  //4 - Update an Employee
    /*editDiagnosys( StartDiagnosy: Appoinment): Observable<any> {
       console.log("Update: In service");
     return this.httpClient.put(environment.apiUrl + 'doctor/'+StartDiagnosy.DoctorId,this.appoinment);
 }*/

  getTodaysAppointments(doctorId: number): Observable<AppoinmentpatientViewmodel[]> {
    return this.httpClient.get<AppoinmentpatientViewmodel[]>(
      `${environment.apiUrl}viewPatientAppoinment/todaysAppointments/${doctorId}`
    );
  }
  

}
