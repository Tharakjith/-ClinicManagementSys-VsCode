import { Specialization } from "./specialization";
import { User } from "./user";

export class Doctors {
    DoctorId: number = 0;
    RegistrationId: number = 0;
    
    SpecializationId: number = 0;
    
      
    ConsultationFee:number = 0.00; 
      
    DoctorIsActive: boolean = false; 
    
     
      users: User= new User();
    
      specialization: Specialization= new Specialization();}

