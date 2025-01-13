
import { Availability } from "./availability";
import { Doctors } from "./doctors";
import { Patient } from "./patient";


export class Appointment {
    "AppointmentId": number = 0;
    "PatientId": string='';
    "SpecializationId": string='';
    "DoctorId": string='';
    "AvailabilityId":number = 0;
    "AppointmentDate": Date = new Date();
    "ConsultationFee": number = 0;
    "RegistrationFee": number = 0;
    "TokenNumber": number = 0;
    "AppointmentStatusId": number = 0;
   //object Orented Model
   
   patient : Patient = new Patient();
   doctor : Doctor = new Doctor();
   availability : Availability = new Availability();
   

import { Specialization } from "./specialization";

export class Appointment {
    PatientId: number = 0;
    SpecializationId: number = 0;
    DoctorId: number = 0;
    AvailabilityId: number = 0;
    AppointmentDate: string = '';
    TokenNumber: number = 0;
    ConsultationFee: number = 0;

    patient: Patient = new Patient();
    specialization: Specialization = new Specialization();
    doctor: Doctors = new Doctors();
    availability: Availability = new Availability();

export class Appointment {
  AppointmentId: number = 0;
  PatientId: number = 0;
  DoctorId: number = 0;
  SpecializationId: number = 0;
  AppointmentDate: string = '';
  TokenNumber: number = 0;
  ConsultationFee: number = 0;
  AvailabilityId: number = 0;


}
