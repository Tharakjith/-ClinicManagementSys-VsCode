import { Department } from "./department";

export class Staff {
    StaffId: number = 0;
    StaffName: string = '';
    DepartmentId: number = 0;
  
    
    Dob: Date = new Date(); // Date of Birth
    Doj: Date = new Date(); // Date of Joining
    CreatedDate: Date = new Date(); 
   
    Address: string = '';
    PhoneNumber: string = '';
    Email: string = '';
  
    
    Gender: string = ''; 
    StaffIsActive: boolean = false; 
  
   
    Department: Department = new Department();
}
