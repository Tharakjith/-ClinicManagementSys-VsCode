import { Appointment } from "./appointment";
import { Doctor } from "./doctor";
import { Patient } from "./patient";

export class AppointmentpatientViewmodel {
    
    "PatientId": number = 0;
    "PatientName": string='';
    "doctorId":number = 0;
    "Dob":  Date = new Date();
    "Gender":string='';
    "BloodGroup": string='';
    "PatientPhone": string='';
    "PatientAddress": string='';
    "RegistrationDate": Date = new Date();
    "AppointmentId": number = 0;
    "AppointmentDate":  Date = new Date();
    "TokenNumber": number = 0;
    "SpecializationName": string='';
    
Patient : Patient = new Patient();
doctor : Doctor = new Doctor();
Appointment :Appointment=new Appointment();

    
  
}