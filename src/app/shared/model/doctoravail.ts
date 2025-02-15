import { Availability } from "./availability";
import { Timeslot } from "./timeslot";
import { Weekdays } from "./weekdays";

export class Doctoravail {
    AvailabilityId: number = 0;
    TimeSlotId: number = 0;
    Session: string = '';
    StartTime: string = '';
    EndTime: string = '';
    Weekday: string = '';
}