import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LabTestReport } from 'src/app/shared/model/lab-test-report';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-labtestviewreport-list',
  templateUrl: './labtestviewreport-list.component.html'
})
export class LabtestviewreportListComponent implements OnInit {
  searchTerm: string = '';
  labTestReport: LabTestReport | null = null;
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
        this.loadLabTestReport(this.appointmentId);
      } else {
        this.toastr.error('Appointment ID not found');
      }
    });
  }

  loadLabTestReport(appointmentId: number): void {
    this.doctorService.getReport(appointmentId).subscribe({
      next: (report) => {
        this.labTestReport = report;
        if (!report) {
          this.toastr.info('No lab test report found for this appointment');
        }
      },
      error: (error) => {
        console.error('Error fetching lab test report:', error);
        this.toastr.error('Failed to load lab test report');
      }
    });
  }
}