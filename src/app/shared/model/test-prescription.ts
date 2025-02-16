import { Appointment } from "./appointment";
import { Labtest } from "./labtest";

export class TestPrescription {

    "TpId"?: number;
    "AppointmentId": number;
    "LabTestId": string;
    "SampleItem": string;
    "IsActive": boolean;
    "patient"?: any; 
  labtest : Labtest = new Labtest();
  appointment: Appointment = new Appointment();
 
}