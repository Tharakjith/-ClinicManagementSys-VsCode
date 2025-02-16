import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/shared/service/patient.service';

@Component({
  selector: 'app-patients-add',
  templateUrl: './patients-add.component.html',
  styleUrls: ['./patients-add.component.scss']
})
export class PatientsAddComponent implements OnInit {
  todayDate: string = new Date().toISOString().split('T')[0];
  minDobDate: string = "1950-01-01";
  maxDobDate: string = this.todayDate;
  showBookingPrompt: boolean = false;
  showConfirmationDialog: boolean = false;
  registeredPatientId: number | null = null;
  errorMessage: string | null = null;

  constructor(public patientService: PatientService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  //Submit Form
  onSubmit(patform: NgForm) {
    console.log('Form Values Submitted:', patform.value);
    this.addPatient(patform);
  }

  addPatient(patform: NgForm) {
    console.log("Inserting Patient...");
    this.patientService.insertPatient(patform.value).subscribe({
      next: (response: any) => {
        console.log('Raw Response:', response); // Debug log
        
        // Check if response has a Value property (based on your API structure)
        if (response && response.Value && response.Value.PatientId) {
          this.registeredPatientId = response.Value.PatientId;
          console.log('Extracted Patient ID:', this.registeredPatientId);
          this.toastr.success('Record has been inserted successfully', 'CMS v2024');
          this.errorMessage = null;
          this.showConfirmationDialog = true;
          patform.reset();
        }
        // Check if PatientId is directly on the response object
        else if (response && response.PatientId) {
          this.registeredPatientId = response.PatientId;
          console.log('Direct Patient ID:', this.registeredPatientId);
          this.toastr.success('Record has been inserted successfully', 'CMS v2024');
          this.errorMessage = null;
          this.showConfirmationDialog = true;
          patform.reset();
        }
        else {
          console.error('Unexpected response structure:', response);
          this.errorMessage = 'Server response format error';
          this.toastr.error('Unexpected server response format', 'Error');
        }
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.toastr.error('An error occurred during registration', 'CMS v2024');
        this.errorMessage = 'An error occurred: ' + (error.message || error);
      }
    });
  }

  onBookAppointment() {
    if (this.registeredPatientId) {
      console.log('Navigating to booking with ID:', this.registeredPatientId);
      // Ensure we're using the correct route format
      this.router.navigate(['patients', 'book', this.registeredPatientId]).then(
        (success) => {
          if (!success) {
            console.error('Navigation failed');
            this.toastr.error('Navigation to booking page failed', 'Error');
          }
        }
      );
    } else {
      console.error('No patient ID available for navigation');
      this.toastr.error('Patient ID not available', 'Error');
    }
  }

  onCloseDialog() {
    this.showConfirmationDialog = false;
    this.router.navigate(['patients', 'list']);
  }

  cancelRegistration() {
    this.router.navigate(['patients', 'list']);
  }
}