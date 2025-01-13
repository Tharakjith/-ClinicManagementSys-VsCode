import { Appointment } from "./appointment";
import { Labtest } from "./labtest";

export class TestPrescription {

    "TpId": number = 0;
    "AppointmentId": number = 0;
    "LabTestId": number = 0;
    "SampleItem": string='';
    IsActive: boolean = false ;

  labtest : Labtest = new Labtest();
  appointment: Appointment = new Appointment();
 
}
