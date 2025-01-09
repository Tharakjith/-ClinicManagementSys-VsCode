import { Role } from "./role";
import { Staff } from "./staff";

export class User {
    RegistrationId: number = 0;
    StaffId: number = 0;
    RoleId: number = 0;
    Password: string = '';
    Username: string = '';
    RIsActive: boolean = false;
    RegisteredDate: Date = new Date();
    StaffName: string = '';
    RoleName: string = '';

    role: Role = new Role();
    staff: Staff = new Staff();
}
