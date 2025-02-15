// davail.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Availability } from '../model/availability';
import { Timeslot } from '../model/timeslot';

@Injectable({
  providedIn: 'root'
})
export class DavailService {
  Updateusers(value: any) {
    throw new Error('Method not implemented.');
  }
  getAlldoctors() {
    throw new Error('Method not implemented.');
  }
  availability: Availability[] = [];
  timeslot: Timeslot[] = [];
  formStaffData: Availability = new Availability();

  constructor(private httpClient: HttpClient) {}

  insertavailability(availability: Availability): Observable<any> {
    return this.httpClient.post(
     `${environment.apiUrl}Doctors/doctor/${availability.DoctorId}`, 
      availability
    );
  }

  // davail.service.ts
// Get All Timeslots
getAllTimeslot(): void {
  this.httpClient.get(environment.apiUrl + 'Doctors/v8')
      .toPromise()
      .then((response: any) => {
          if (response.Value) {
              this.timeslot = response.Value.map((timeslot: any) => ({
                  ...timeslot,
                  StartTime: this.formatTime(timeslot.StartTime),
                  EndTime: this.formatTime(timeslot.EndTime),
                  // Use Weekday instead of Weekdays to match your model
                  Weekday: timeslot.Weekdays  // Map the backend's "Weekdays" to your model's "Weekday"
              }));
              console.log('Mapped Timeslots:', this.timeslot);
          }
      })
      .catch((error) => {
          console.log('Error occurred:', error);
      });
}

private formatTime(time: string): string {
  if (!time) return '';
  // Handle "HH:mm:ss" format
  if (time.includes(':')) {
      return time.substring(0, 5); // Returns "HH:mm"
  }
  return time;
}
  getTimeSlotDetails(timeSlotId: number): Observable<any> {
    return this.httpClient.get(
      `${environment.apiUrl}Doctors/timeslot/${timeSlotId}`
    );
  }
}