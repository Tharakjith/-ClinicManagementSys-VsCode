import { Appointment } from "./appointment";
import { MedicineDetail } from "./medicine-detail";

export class Prescription {
    PrescriptionId: number = 0;
    AppointmentId: number = 0;
    MedicineId: number = 0;
    MedicineName: string = '';
    Dosage: string = '';
    Frequency: string = '';
    NumberofDays: number = 0;
    IsActive: boolean = false;
    
    medicineDetails: MedicineDetail = new MedicineDetail();
    appointment: Appointment = new Appointment();
}

