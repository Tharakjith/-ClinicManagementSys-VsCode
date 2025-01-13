import { Category } from "./category";

export class MedicineDetail {
    "MedicineId": number = 0;
    "MedicineName": string='';
    "ManufacturingDate":  Date = new Date();
    "ExpiryDate":  Date = new Date();
    "Category": number = 0;
    "Cost": string='';
    IsActive: boolean = false;

    category: Category = new Category();
   
}
