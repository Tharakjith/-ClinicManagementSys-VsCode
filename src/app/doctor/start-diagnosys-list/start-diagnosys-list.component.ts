import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/shared/service/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { StartDiagnosy } from 'src/app/shared/model/start-diagnosy';



@Component({
  selector: 'app-start-diagnosys-list',
  templateUrl: './start-diagnosys-list.component.html'
})
export class StartDiagnosysListComponent implements OnInit {
  searchTerm: string = '';
  startDiagnosy: StartDiagnosy | null = null;
  page: number = 1;
  pageSize: number = 10;
  appointmentId: number = 0;

  constructor(
    public doctorService: DoctorService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointmentId = +params['appointmentId'];
      if (this.appointmentId) {
        this.loadDiagnosysReport(this.appointmentId);
      } else {
        this.toastr.error('Appointment ID not found');
      }
    });
  }

  loadDiagnosysReport(appointmentId: number): void {
    this.doctorService.gettheDiagnosys(appointmentId).subscribe({
      next: (report) => {
        this.startDiagnosy = report;
        if (!report) {
          this.toastr.info('No History found for this appointment');
        }
      },
      error: (error) => {
        console.error('Error fetching History :', error);
        this.toastr.error('Failed to load History');
      }
    });
  }
}