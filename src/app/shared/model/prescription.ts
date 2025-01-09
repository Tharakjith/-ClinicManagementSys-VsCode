import { MedicineDetail } from "./medicine-detail";

export class Prescription {


    "PrescriptionId": number = 0;
    "AppointmentId": number = 0;
    "MedicineId": number = 0;
    "Dosage": string='';
    "Frequency": string='';
    "NumberofDays": number = 0;
    medicineDetails:MedicineDetail=new MedicineDetail();
   

}
