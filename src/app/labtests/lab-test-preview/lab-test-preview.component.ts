import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LabTestServiceService } from 'src/app/shared/service/lab-test-service.service';

@Component({
  selector: 'app-lab-test-preview',
  templateUrl: './lab-test-preview.component.html',
  styleUrls: ['./lab-test-preview.component.scss']
})
export class LabTestPreviewComponent implements OnInit {
  reportDetails: any = {};
  reportId: number = 0;
  isPrintDisabled = false;

  constructor(
    private route: ActivatedRoute,
    private labTestService: LabTestServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reportId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (this.reportId) {
      this.loadReportDetails();
    } else {
      this.toastr.error('No report ID found');
      this.router.navigate(['/labtests']);
    }
  }

  loadReportDetails(): void {
    // Use the getReportDetails method with the LabTestReportId
    this.labTestService.getReportDetails(this.reportId).subscribe({
      next: (details) => {
        this.reportDetails = {
          TpId: details.TpId,
          LtreportId: details.LtreportId,
          PatientName: details.PatientName,
          TestName: details.TestName,
          SampleItem: details.SampleItem,
          LowRange: details.LowRange,
          HighRange: details.HighRange,
          ActualResult: details.ActualResult,
          Remarks: details.Remarks,
          BloodGroup: details.BloodGroup,
          Gender: details.Gender,
          PatientPhone: details.PatientPhone
        };
      },
      error: (error) => {
        this.toastr.error('Failed to load report details');
        console.error('Error loading report details:', error);
        this.router.navigate(['/labtests']);
      }
    });
  }

  loadReportDetailsByTpId(): void {
    this.labTestService.getTodaysPrescribedTests().subscribe({
      next: (tests) => {
        const selectedTest = tests.find(test => test.TpId === this.reportId);
        if (selectedTest) {
          this.reportDetails = {
            PatientName: selectedTest.PatientName || '',
            TestName: selectedTest.TestName || '',
            SampleItem: selectedTest.SampleItem || '',
            LowRange: 0,
            HighRange: 0,
            ActualResult: '', 
            Remarks: ''
          };
        }
      },
      error: () => {
        this.toastr.error('Failed to load test details');
        this.router.navigate(['/labtests']);
      }
    });
  }

  printLabReport(): void {
    this.isPrintDisabled = true;
    setTimeout(() => {
      window.print();
      this.isPrintDisabled = false;
    }, 100);
  }
  
  downloadBill(): void {
    this.router.navigate(['/labtests/bill', this.reportId]);
  }
}