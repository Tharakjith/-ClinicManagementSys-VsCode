import { Availability } from "./availability";
import { Doctor } from "./doctor";
import { Patient } from "./patient";
<<<<<<< HEAD

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
   
=======
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
    doctor: Doctor = new Doctor();
    availability: Availability = new Availability();
>>>>>>> d0fdefa26a72c0830a362f9717447626f7d53d96


}
