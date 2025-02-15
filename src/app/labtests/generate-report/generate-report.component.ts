import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Labtestreport } from 'src/app/shared/model/labtestreport';
import { Todaylabtest } from 'src/app/shared/model/todaylabtest';
import { LabTestServiceService } from 'src/app/shared/service/lab-test-service.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html'

})
export class GenerateReportComponent implements OnInit {
  actualResultInvalid = false;
remarksInvalid = false;

  tpId!: number;
  reportDetails: any = {};
  report: Labtestreport = {
    LtreportId: 0,
    AppointmentId: 0,
    LabTestId: 0,
    ActualResult: '',
    Remarks: '',
    TestName: '',
    PatientName: '',
    LowRange: 0,
    HighRange: 0,
    TpId: 0,
    SampleItem: ''
  };
  isSubmitDisabled = true;

  constructor(
    private route: ActivatedRoute,
    private labTestService: LabTestServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.tpId = Number(this.route.snapshot.paramMap.get('TpId'));
    this.loadReportDetails();
  }

  loadReportDetails(): void {
    this.labTestService.getTodaysPrescribedTests().subscribe({
      next: (tests) => {
        const selectedTest = tests.find(test => test.TpId === this.tpId);

        if (selectedTest) {
          this.reportDetails = {
            ...selectedTest,
            LowRange: 0,
            HighRange: 0
          };

          this.labTestService.getLabTestDetails(selectedTest.LabTestId).subscribe({
            next: (labTestDetails) => {
              this.reportDetails.LowRange = labTestDetails.LowRange || 0;
              this.reportDetails.HighRange = labTestDetails.HighRange || 0;
              this.reportDetails.SampleItem = selectedTest.SampleItem || '';

              this.report = {
                LtreportId: 0,
                AppointmentId: selectedTest.AppointmentId,
                LabTestId: selectedTest.LabTestId,
                TpId: this.tpId,
                ActualResult: '',
                Remarks: '',
                TestName: selectedTest.TestName,
                PatientName: selectedTest.PatientName,
                LowRange: this.reportDetails.LowRange,
                HighRange: this.reportDetails.HighRange,
                SampleItem: this.reportDetails.SampleItem
              };
            }
          });
        }
      },
      error: () => {
        this.toastr.error('Failed to load test details');
      }
    });
  }

  validateForm(): void {
    const actualResult = Number(this.report.ActualResult);
    const remarksPattern = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
  
    // Validate Actual Result
    this.actualResultInvalid = !(actualResult >= 10 && actualResult <= 200);
  
    // Validate Remarks
    this.remarksInvalid = !(
      this.report.Remarks.trim().length >= 3 &&
      this.report.Remarks.trim().length <= 15 &&
      remarksPattern.test(this.report.Remarks.trim())
    );
  
    // Disable the submit button if either field is invalid
    this.isSubmitDisabled = this.actualResultInvalid || this.remarksInvalid;
  }
  

  onSubmit(): void {
    if (this.report.ActualResult.trim() && this.report.Remarks.trim()) {
      this.labTestService.createLabReport(this.report).subscribe({
        next: (response) => {
          // Navigate to preview using the LtreportId if available
          const reportId = response.LtreportId || response.id;
          this.router.navigate(['/labtests/preview', reportId]);
          this.toastr.success('Report generated successfully');
        },
        error: (error) => {
          const errorMsg = error.error || error.message || 'Failed to generate report';
          this.toastr.error(errorMsg);
        }
      });
    }
  }
}