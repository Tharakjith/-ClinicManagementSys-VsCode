import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Labtest } from 'src/app/shared/model/labtest';
import { LabTestServiceService } from 'src/app/shared/service/lab-test-service.service';

@Component({
  selector: 'app-lab-test-bill',
  templateUrl: './lab-test-bill.component.html',
  styleUrls: ['./lab-test-bill.component.scss']
})
export class LabTestBillComponent implements OnInit {
  billDetails: any = {};
  reportId: number = 0;
  

  constructor(
    private route: ActivatedRoute,
    private labTestService: LabTestServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.reportId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.reportId) {
      this.loadBillDetails();
    }
  }

  loadBillDetails(): void {
    const prices = [100, 200, 300, 350, 250, 400, 500];
    const randomPrice = prices[Math.floor(Math.random() * prices.length)];
   
    this.labTestService.getReportDetails(this.reportId).subscribe({
      next: (details) => {
        this.billDetails = {
          ReportId: details.LtreportId,
          PatientName: details.PatientName,
          Gender: details.Gender,
          BloodGroup: details.BloodGroup,
          PhoneNumber: details.PatientPhone,
          Sample: details.SampleItem,
          TestName: details.TestName,
          Remarks: details.Remarks,
          Price: randomPrice
        };
      },
      error: () => {
        this.toastr.error('Failed to load bill details');
        this.router.navigate(['/labtests']);
      }
    });
   }

  downloadBill(): void {
    window.print();
    this.router.navigate(['/labtests/labtests']);
  }
}