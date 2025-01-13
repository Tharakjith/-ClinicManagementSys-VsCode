import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StartDiagnosy } from '../model/start-diagnosy';
import { AppointmentpatientViewmodel } from '../model/appointmentpatient-viewmodel';
import { Appointment } from '../model/appointment';
import { Doctor } from '../model/doctor';
import { Prescription } from '../model/prescription';
import { Medicinedetails } from '../model/medicinedetails';
import { Doctors } from '../model/doctors';
import { Labtest } from '../model/labtest';
import { TestPrescription } from '../model/test-prescription';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  //declare some variables
  //List of Employees
  startDiagnosy: StartDiagnosy[] = [];
  doctors: Doctors[] = [];
  medicinedetails:Medicinedetails [] = [];
  formDiagnosysData: StartDiagnosy = new StartDiagnosy();
  appointment: Appointment[] = [];
  prescription: Prescription[] = [];
   //List of TestPrescription
   labtest: Labtest[] = [];
   testPrescription: TestPrescription[] = [];
   formLabtestData: TestPrescription= new TestPrescription();
 
  appointmentpatientViewmodel: AppointmentpatientViewmodel[] = [];
  formappointment: AppointmentpatientViewmodel = new AppointmentpatientViewmodel();
  formMedicineData: Prescription = new Prescription();
  DateOfJoining: any;
  DiagnosysDate: any;

  constructor(private httpClient: HttpClient) { }

  //1-Get all Employees
  getAllAppointment(): void {
    this.httpClient.get(environment.apiUrl + 'viewPatientAppoinment/todaysAppointments/{doctorId}')
      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.appointmentpatientViewmodel = response.Value;
          console.log(this.appointmentpatientViewmodel);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  getTodaysAppointments(doctorId: number): Observable<AppointmentpatientViewmodel[]> {
    return this.httpClient.get<AppointmentpatientViewmodel[]>(
      `${environment.apiUrl}viewPatientAppoinment/todaysAppointments/${doctorId}`
    );
  }

  //1-Get all Doctors
  getAllDoctors(): void {
    this.httpClient.get(environment.apiUrl + 'StartDiagnosys/DoctorNames')
      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.doctors = response.Value;
          console.log(this.doctors);
        }
      })
      .catch((error) => {
        console.log('Error Occured : ', error);
      });
  }
  getAllDiagnosys(): void {
    this.httpClient.get(environment.apiUrl + 'StartDiagnosys/Get')
      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.startDiagnosy = response.Value;
          console.log(this.startDiagnosy);
        }
      })
      .catch((error) => {
        console.log('Error Occured : ', error);
        
      });
  }

  //Insert Employee
  insertDiagnosys(startDiagnosy: StartDiagnosy): Observable<any> {
    console.log("Insert In service ");
    console.log('Payload:', startDiagnosy);

    console.log('API URL:', `${environment.apiUrl}StartDiagnosys`);

    // return this.httpClient.post(environment.apiUrl + 'StartDiagnosys' + startDiagnosys.AppointmentId,this.startDiagnosys);
    return this.httpClient.post(`${environment.apiUrl}StartDiagnosys`, this.startDiagnosy);
    
  }

  //4 - Update an Employee
  editDiagnosys(startDiagnosy: StartDiagnosy): Observable<any> {
    console.log("Update: In service");
    return this.httpClient.put(environment.apiUrl + 'startDiagnosys/{id}' + startDiagnosy.AppointmentId, this.startDiagnosy);
  }
  //4 - Update an Employee
  getDiagnosys(startDiagnosy: StartDiagnosy): Observable<any> {
    console.log("get: In service");
    return this.httpClient.put(environment.apiUrl + 'startDiagnosys/{id}' + startDiagnosy.HistoryId, this.startDiagnosy);
  }
  //---------------------------------------------------------------------------------------------------------------------------------
  //1-Get all Employees
  getAllPrescription(): void {
    this.httpClient.get(environment.apiUrl + 'MedicinePrescription')
      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.prescription = response.Value;
          console.log(this.prescription);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
//-----------------------------
  //Insert Medicine
  insertMedicine(prescription: Prescription): Observable<any> {
    console.log("Insert In service ");
    return this.httpClient.post(`${environment.apiUrl}MedicinePrescription/AM`, this.prescription);
  }
  //Get All Departmnets
  getAllMedicine(): void {
    this.httpClient.get(environment.apiUrl +'MedicinePrescription/GetMN')
      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.medicinedetails = response.Value;
          console.log(this.medicinedetails);
        }

      })
      .catch((error) => {
        console.log('Error Occured:', error);
      })
  }

  //4 - Update an Employee
  editMedicine(prescription: Prescription): Observable<any> {
    console.log("Update: In service");
    return this.httpClient.put(environment.apiUrl + 'prescription/' + prescription.AppointmentId, prescription);
  }

//-------------------------------------------------------------------------
  
 //Get all Employees
 getAllTest(): void {
  this.httpClient.get(environment.apiUrl + 'doctor')
    .toPromise()
    .then((response?: any) => {
      if (response.Value) {
        this.testPrescription = response.Value;
        console.log(this.testPrescription);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

  //Insert TestPrescription
  insertTest(testPrescription:TestPrescription): Observable<any>{
    console.log("Insert In service ");
    return this.httpClient.post(environment.apiUrl + 'LabtestPresciption/LP',
      TestPrescription);
  }
  //Get All getAllLabtest
 getAllLabtest(): void {
    this.httpClient.get(environment.apiUrl +'labtest/GetLN')
    .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.labtest = response.Value;
          console.log(this.labtest);
        }
       
      })
      .catch((error) => {
        console.log('Error Occured:',error);
      })
    }
  //4 - Update an Employee
  editTest( testPrescription: TestPrescription): Observable<any> {
    console.log("Update: In service");
    return this.httpClient.put(environment.apiUrl + 'LabtestPresciption/'+testPrescription.TpId,testPrescription);
}



}

