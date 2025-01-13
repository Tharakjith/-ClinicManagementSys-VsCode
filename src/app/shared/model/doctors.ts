import { Specialization } from "./specialization";
import { Staff } from "./staff";
import { User } from "./user";

export class Doctors {
    DoctorId: number = 0;
    RegistrationId: number = 0;
    StaffId:number=0;
    SpecializationId: number = 0;
    
      
    ConsultationFee:number = 0.00; 
      
    DoctorIsActive: boolean = false; 
    
     staff:Staff=new Staff();
      users: User= new User();
<<<<<<< HEAD
      StaffName: string = '';
      specialization: Specialization= new Specialization();
      staff:Staff=new Staff();
    }
=======
    
      specialization: Specialization= new Specialization();
    }

>>>>>>> d0fdefa26a72c0830a362f9717447626f7d53d96

