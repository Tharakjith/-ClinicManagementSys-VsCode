import { Department } from "./department";

export class Staff {
    staffId: number = 0;
    staffName: string = "";
    dob: Date = new Date();
    doj: Date = new Date();
    createdDate: Date = new Date();
    address: string = "";
    phoneNumber: string = "";
    email: string = "";
    gender: string = "";
    departmentId: number = 0;
    staffIsActive: boolean = false;

    department: Department = new Department();
}
