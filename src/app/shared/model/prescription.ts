import { Appointment } from "./appointment";
import { MedicineDetail } from "./medicine-detail";

import { Medicinedetails } from "./medicinedetails";


export class Prescription {


    "PrescriptionId": number = 0;
    "AppointmentId": number = 0;
    "MedicineId": number = 0;
    "Dosage": string='';
    "Frequency": string='';
    "NumberofDays": number = 0;

    IsActive: boolean = false ;
    
    medicineDetails:MedicineDetail=new MedicineDetail();
    appointment:Appointment=new Appointment();
  
}