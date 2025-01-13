<<<<<<< HEAD
import { Appointment } from "./appointment";
import { MedicineDetail } from "./medicine-detail";
=======
import { Medicinedetails } from "./medicinedetails";
>>>>>>> d0fdefa26a72c0830a362f9717447626f7d53d96

export class Prescription {


    "PrescriptionId": number = 0;
    "AppointmentId": number = 0;
    "MedicineId": number = 0;
    "Dosage": string='';
    "Frequency": string='';
    "NumberofDays": number = 0;
<<<<<<< HEAD
    IsActive: boolean = false ;
    
    medicineDetails:MedicineDetail=new MedicineDetail();
    appointment:Appointment=new Appointment();
   
=======
    medicineDetails:Medicinedetails=new Medicinedetails();
>>>>>>> d0fdefa26a72c0830a362f9717447626f7d53d96

}
