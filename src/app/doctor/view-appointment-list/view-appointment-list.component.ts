import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/shared/service/doctor.service';
import { AppointmentpatientViewmodel } from 'src/app/shared/model/appointmentpatient-viewmodel';
import { DatePipe } from '@angular/common';
import { StartDiagnosy } from 'src/app/shared/model/start-diagnosy';
import { Doctor } from 'src/app/shared/model/doctor';


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

  constructor(
    public doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

getDiagnosys(): void {
  // Redirect to the booking appointment page
  this.router.navigate(['/doctor/list/']);
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
