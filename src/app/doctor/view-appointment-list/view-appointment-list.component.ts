import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/shared/service/doctor.service';
import { AppointmentpatientViewmodel } from 'src/app/shared/model/appointmentpatient-viewmodel';
import { DatePipe } from '@angular/common';
import { StartDiagnosy } from 'src/app/shared/model/start-diagnosy';
import { Doctor } from 'src/app/shared/model/doctor';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-view-appointment-list',
  templateUrl: './view-appointment-list.component.html',
  styleUrls: ['./view-appointment-list.component.scss']
})

export class ViewAppointmentListComponent implements OnInit {
  appointments: AppointmentpatientViewmodel[] = [];
  startDiagnosy: StartDiagnosy[] = [];
  searchTerm: string | null = null;
  page: number = 1;
  pageSize: number = 6;
  toastr: any;
  httpClient: any;

  constructor(
    public doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.loadAppointments(doctorId);
    // Get doctor ID from route parameters
    const doctorId = Number(this.route.snapshot.paramMap.get('doctorId'));

    if (doctorId) {
      // Fetch appointments for the doctor
      this.doctorService.getTodaysAppointments(doctorId).subscribe(
        (response) => {
          this.appointments = response;
          console.log(this.appointments);
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    }
  }
  //getDiagnosys(start-diagnosys)
  
  insertDiagnosys(doctor: AppointmentpatientViewmodel): void {
    // Redirect to the booking appointment page
    this.router.navigate(['/doctor/add/'+doctor.AppointmentId]);
}

getDiagnosys(appointment: AppointmentpatientViewmodel): void {
  if (appointment?.AppointmentId) {
    this.router.navigate(['doctor/StartDiagnosys/list', appointment.AppointmentId]);
  }
}
loadAppointments(doctorId: number): void {
  this.doctorService.getTodaysAppointments(doctorId).subscribe({
    next: (appointments) => {
      this.doctorService.appointmentpatientViewmodel = appointments;
    },
    error: (error) => {
      console.error('Error loading appointments:', error);
    }
  });
}

//View LabReport
getReport(appointmentId: number): void {
  if (appointmentId) {
    this.router.navigate(['/doctor/viewreport', appointmentId]);
  } else {
    this.toastr.error('Invalid Appointment ID');
  }
}

//gettheDiagnosys
gettheDiagnosys(appointmentId: number): void {
  if (appointmentId) {
    this.router.navigate(['/doctor/viewdigno', appointmentId]);
  } else {
    this.toastr.error('Invalid Appointment ID');
  }
}

  filteredAppointment(): AppointmentpatientViewmodel[] {
    if (!this.searchTerm) {
      return this.appointments;
    }

    const lowerSearch = this.searchTerm.toLowerCase();

    return this.appointments.filter((appointment) =>
      (appointment.PatientName?.toLowerCase().includes(lowerSearch) ||
        `${appointment.TokenNumber}`.toLowerCase().includes(lowerSearch))
    );
  }
}