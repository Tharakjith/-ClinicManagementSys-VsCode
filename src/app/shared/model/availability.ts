import { Doctors } from "./doctors";
import { Timeslot } from "./timeslot";
import { Weekdays } from "./weekdays";


export class Availability {
    AvailabilityId: number = 0;
    TimeSlotId: number = 0;
    Session: string = '';
    StartTime: string = '';
    EndTime: string = '';
    WeekdaysId: number = 0;
    WeekdaysName: string = '';
    DoctorId: number = 0;
    Doctors: Doctors = new Doctors();
    Timeslot: Timeslot = new Timeslot();
    Weekdays: Weekdays = new Weekdays();


    
}