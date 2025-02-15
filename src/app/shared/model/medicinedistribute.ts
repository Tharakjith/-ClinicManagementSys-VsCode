// medicinedistribute.model.ts
export class Medicinedistribute {
    MedDistId: number = 0;
    PrescriptionId: number = 0;
    MedicineId: number = 0;
    QuantityDistributed: number = 0;
    DistributionDate: string = ''; // Changed to string type
    MedStatusId: number = 1;
    PatientName: string = '';
    MedicineName: string = '';
    Dosage: string = '';
    Frequency: string = '';
    NumberofDays: number = 0;
    StockInHand: number = 0;
}