import { Appointment } from "./appointment"
import { Labtest } from "./labtest"
import { TestPrescription } from "./test-prescription";

export class LabTestReport {

   "LtreportId" : number=0;

   "AppointmentId"  : number=0;
   
   "LabTestId" : number=0;
   
   "HighRange": number=0;
   
   "LowRange" : number=0;
   
   "ActualResult": number=0;
   
   "Remarks" :string ='';
   
 appointment :Appointment =new Appointment ();
 testPrescription:TestPrescription = new TestPrescription();

 labtest :Labtest = new Labtest (); 

}