export class Timeslot {
    public TimeSlotId: number = 0;
    public StartTime?: string = '';
    public EndTime?: string = '';
    public WeekdaysId?: number = 0;
    public Weekday?: any;  // This is the property name we need to use
    public Availabilities: any[] = [];
}