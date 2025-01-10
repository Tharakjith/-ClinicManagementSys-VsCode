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
Salary:number =0;
  
  Gender: string = ''; 
  Salary: number = 0.00;
  StaffIsActive: boolean = false; 

 
  Department: Department = new Department(); }
  
