import { Appointment } from "./appointment";
import { Doctors } from "./doctors";

export class StartDiagnosy {

    "HistoryId": number = 0;
    "Diagnosis": string='';
    "Symptoms": string='';
    "NextVisiting":Date = new Date();
    "DoctorNote":string='';
    "DiagnosysDate": string='';
    "DateTime": Date = new Date();
    
    "AppointmentId": number = 0;
    "IsActive": boolean;
    
    appointment:Appointment=new Appointment();
    doctors:Doctors=new Doctors();
  


   
}
