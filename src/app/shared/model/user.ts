import { Role } from "./role";
import { Staff } from "./staff";

export class User {
    
RegistrationId: number = 0;
  
  StaffId: Staff = new Staff();
  RoleId: number = 0;
  Password: string = '';
  Username: string = '';
  RIsActive: boolean = false; 
  RegisteredDate: Date = new Date(); 
 
  
  
  
 role:Role = new Role();

}
