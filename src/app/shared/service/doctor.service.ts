import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { StartDiagnosy } from '../model/start-diagnosy';
import { AppointmentpatientViewmodel } from '../model/appointmentpatient-viewmodel';
import { Appointment } from '../model/appointment';
import { Doctor } from '../model/doctor';
import { Prescription } from '../model/prescription';
import { Medicinedetails } from '../model/medicinedetails';
import { Doctors } from '../model/doctors';
import { Labtest } from '../model/labtest';
import { TestPrescription } from '../model/test-prescription';
import { LabTestReport } from '../model/lab-test-report';


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
  labTestReport:LabTestReport=new LabTestReport();
  DateOfJoining: any;
 // formDiagnosysData: StartDiagnosy = new StartDiagnosy();
  
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

//View Today Appointment
  getTodaysAppointments(doctorId: number): Observable<AppointmentpatientViewmodel[]> {
    return this.httpClient.get<AppointmentpatientViewmodel[]>(
      `${environment.apiUrl}viewPatientAppoinment/todaysAppointments/${doctorId}`
    );
  }
  getReport(appointmentId: number): Observable<LabTestReport> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}LabtestPresciption/${appointmentId}`
    ).pipe(
      map(response => response.Value), // Extract the Value property from response
      catchError(error => {
        console.error('Error fetching lab test report:', error);
        return throwError(() => error);
      })
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
    this.httpClient.get(environment.apiUrl + 'StartDiagnosys/:appId')
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

 
    gettheDiagnosys(appointmentId: number): Observable<StartDiagnosy> {
      return this.httpClient.get<any>(
        `${environment.apiUrl}StartDiagnosys/${appointmentId}`
      ).pipe(
        map(response => response.Value), // Extract the Value property from response
        catchError(error => {
          console.error('Error fetching lab test report:', error);
          return throwError(() => error);
        })
      );
    }
  
    // Insert Diagnosis
    insertDiagnosys(diagnosysData: StartDiagnosy): Observable<any> {
      const payload = {
        appointmentId: diagnosysData.AppointmentId, // Ensure this is set
        diagnosis: diagnosysData.Diagnosis,
        symptoms: diagnosysData.Symptoms,
        nextVisiting: diagnosysData.NextVisiting,
        doctorNote: diagnosysData.DoctorNote,
        diagnosysDate: diagnosysData.DiagnosysDate
      };
    
      console.log('Sending payload:', payload);
      
      return this.httpClient.post(`${environment.apiUrl}StartDiagnosys`, payload);
    }
    
  

  //4 - Update an Employee
  editDiagnosys(startDiagnosy: StartDiagnosy): Observable<any> {
    console.log("Update: In service");
    return this.httpClient.put(environment.apiUrl + 'startDiagnosys/{id}' + startDiagnosy.AppointmentId, this.startDiagnosy);
  }
  //4 - Update an Employee
  getDiagnosys(appointmentId: number): Observable<any> {
    console.log("Fetching Diagnosys for Appointment ID:", appointmentId);
    return this.httpClient.get(environment.apiUrl + 'startDiagnosys/' + appointmentId);
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
  insertTest(testPrescription: TestPrescription): Observable<any> {
    console.log('Sending Payload:', testPrescription);
    return this.httpClient.post<any>(`${environment.apiUrl}LabtestPresciption/LP`, testPrescription);
  }
  //Get All getAllLabtest
//  getAllLabtest(): void {
//     this.httpClient.get(environment.apiUrl +'labtest/GetLN')
//     .toPromise()
//       .then((response?: any) => {
//         if (response.Value) {
//           this.labtest = response.Value;
//           console.log(this.labtest);
//         }
       
//       })
//       .catch((error) => {
//         console.log('Error Occured:',error);
//       })
//     }


getAllLabtest(): void {
  this.httpClient.get(environment.apiUrl +'LabtestPresciption/v7')
    .toPromise()
    .then((response?: any) => {
      if (response.Value) {
        this.labtest = response.Value;
        console.log(this.labtest);
      }

    })
    .catch((error) => {
      console.log('Error Occured:', error);
    })
}
  //4 - Update an Employee
  editTest( testPrescription: TestPrescription): Observable<any> {
    console.log("Update: In service");
    return this.httpClient.put(environment.apiUrl + 'LabtestPresciption/'+testPrescription.TpId,testPrescription);
}
getLabtest(startDiagnosy: StartDiagnosy): Observable<any> {
  console.log("get: In service");
  return this.httpClient.put(environment.apiUrl + 'LabTestReport/{id}' + this.labTestReport.AppointmentId, this.labTestReport);
}

insertMedicine(prescription: Prescription): Observable<any> {
  console.log('Sending prescription data:', prescription);
  
  // Create the payload with the correct MedicineId
  const payload = {
      AppointmentId: prescription.AppointmentId,
      MedicineId: prescription.MedicineId, // This will now be correctly populated
      Dosage: prescription.Dosage,
      Frequency: prescription.Frequency,
      NumberofDays: prescription.NumberofDays,
      IsActive: prescription.IsActive
  };

  return this.httpClient.post(`${environment.apiUrl}MedicinePrescription/AM`, payload)
      .pipe(
          catchError(error => {
              console.error('Error in insertMedicine:', error);
              return throwError(() => error);
          })
      );
}

getAllMedicine(): void {
  this.httpClient.get(environment.apiUrl + 'MedicinePrescription/v7')
      .toPromise()
      .then((response?: any) => {
          if (response && response.Value) {
              this.medicinedetails = response.Value;
              console.log('Medicine details:', this.medicinedetails);
          }
      })
      .catch((error) => {
          console.error('Error fetching medicines:', error);
      });
}
}


