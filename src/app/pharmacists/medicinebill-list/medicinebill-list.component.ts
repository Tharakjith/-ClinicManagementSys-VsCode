import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MedicinebillService } from 'src/app/shared/service/medicinebill.service';
import { Medicinebill } from 'src/app/shared/model/medicinebill';

@Component({
  selector: 'app-medicinebill-list',
  templateUrl: './medicinebill-list.component.html',
  styleUrls: ['./medicinebill-list.component.scss']
})
export class MedicinebillListComponent implements OnInit {
  medicinebill: Medicinebill = new Medicinebill();
  loading: boolean = true;

  constructor(
    private medicinebillService: MedicinebillService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const prescriptionId = +params['prescriptionId']; // Convert to number
      if (prescriptionId) {
        this.loadBillDetails(prescriptionId);
      } else {
        this.toastr.error('No prescription ID provided');
        this.loading = false;
      }
    });
  }

  loadBillDetails(prescriptionId: number): void {
    this.loading = true;
    this.medicinebillService.getBillDetails(prescriptionId).subscribe({
      next: (data) => {
        this.medicinebill = data;
        this.loading = false;
        this.toastr.success('Bill details loaded successfully');
      },
      error: (error) => {
        console.error('Error loading bill details:', error);
        this.toastr.error('Failed to load bill details');
        this.loading = false;
      }
    });
  }

  generateBill(): void {
    if (this.medicinebill.PrescriptionId) {
      this.medicinebillService.generatePDF(this.medicinebill); // Generate the PDF
      this.deleteBill(this.medicinebill.PrescriptionId); // Delete the bill from the list
  
      this.toastr.success('Bill downloaded successfully and removed from the list');
  
      // Redirect to the desired page after a slight delay
      setTimeout(() => {
        this.router.navigate(['/medicine-prescriptions/Medicineprescriptionlist']);
      }, 1000); // Optional delay for better user experience
    } else {
      this.toastr.error('No bill data available to generate PDF');
    }
  }
  

  deleteBill(prescriptionId: number): void {
    this.medicinebillService.deleteBill(prescriptionId).subscribe({
      next: () => {
        this.toastr.success('Bill deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting bill:', error);
      }
    });
  }
}
