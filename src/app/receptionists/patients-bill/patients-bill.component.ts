import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patientbill } from 'src/app/shared/model/patient-bill';
import { PatientService } from 'src/app/shared/service/patient.service';

@Component({
    selector: 'app-patients-bill',
    templateUrl: './patients-bill.component.html',
    styleUrls: ['./patients-bill.component.scss']
})
export class PatientsBillComponent implements OnInit {

  billDetails: Patientbill | null = null;
  patientId: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
      private patientService: PatientService,
      private route: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
          this.patientId = +params['id'];
          console.log('Patient ID from route:', this.patientId);
          if (this.patientId) {
              this.loadBillDetails();
          }
      });
  }

  loadBillDetails(): void {
      this.isLoading = true;
      this.patientService.getPatientBill(this.patientId).subscribe({
          next: (response) => {
              console.log('API Response:', response);
              if (response) {
                  this.billDetails = new Patientbill(response);
              }
              this.isLoading = false;
          },
          error: (error) => {
              console.error('Error loading bill:', error);
              this.errorMessage = 'Error loading bill details: ' + (error.error?.message || error.message);
              this.toastr.error(this.errorMessage);
              this.isLoading = false;
          }
      });
  }

  generatePDF(): void {
      if (!this.billDetails) return;

      const billHTML = `
        <html>
          <head>
            <title>Patient Bill</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
              body { padding: 20px; font-family: Arial, sans-serif; }
              .bill-header { text-align: center; margin-bottom: 30px; }
              .bill-footer { text-align: center; margin-top: 50px; font-size: 12px; }
              .table th { width: 40%; }
              @media print {
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="bill-header">
                <h2>Clinic Management System</h2>
                <h3>Patient Bill</h3>
                <p>Date: ${new Date().toLocaleDateString()}</p>
              </div>
  
              <div class="row">
                <div class="col-12">
                  <h4>Patient Information</h4>
                  <table class="table table-bordered">
                    <tr><th>Patient ID</th><td>${this.billDetails.patientId}</td></tr>
                    <tr><th>Patient Name</th><td>${this.billDetails.patientName}</td></tr>
                    <tr><th>Phone</th><td>${this.billDetails.patientPhone}</td></tr>
                    <tr><th>Address</th><td>${this.billDetails.patientAddress}</td></tr>
                  </table>
  
                  <h4>Appointment Details</h4>
                  <table class="table table-bordered">
                    <tr><th>Appointment ID</th><td>${this.billDetails.appointmentId}</td></tr>
                    <tr><th>Doctor Name</th><td>${this.billDetails.staffName}</td></tr>
                    <tr><th>Token Number</th><td>${this.billDetails.tokenNumber}</td></tr>
                    <tr><th>Appointment Date</th><td>${new Date(this.billDetails.appointmentDate).toLocaleDateString()}</td></tr>
                  </table>
  
                  <h4>Fee Details</h4>
                  <table class="table table-bordered">
                    <tr><th>Consultation Fee</th><td>₹${this.billDetails.consultationFee}</td></tr>
                    <tr><th>Registration Fee</th><td>₹${this.billDetails.registrationFee}</td></tr>
                    <tr class="table-primary">
                      <th>Total Amount</th>
                      <td>₹${this.billDetails.consultationFee + this.billDetails.registrationFee}</td>
                    </tr>
                  </table>
                </div>
              </div>
  
              <div class="bill-footer">
                <p>This is a computer-generated bill</p>
              </div>
            </div>
            <script>
              window.onload = function() {
                  window.print();
                  window.onafterprint = function() {
                      window.location.href = '/patients/list';
                  };
              };
            </script>
          </body>
        </html>`;

      // Create a Blob from the HTML content
      const blob = new Blob([billHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      
      // Create an iframe to load the content (hidden from view)
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      iframe.onload = () => {
          // Once iframe is loaded, trigger print
          iframe.contentWindow?.print();
          
          // Clean up
          setTimeout(() => {
              document.body.removeChild(iframe);
              window.URL.revokeObjectURL(url);
              this.router.navigate(['/patients/list']);
          }, 1000);
      };
      
      iframe.src = url;
      this.toastr.success('Generating PDF...');
  }
}