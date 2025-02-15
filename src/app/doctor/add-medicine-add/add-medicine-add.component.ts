import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/shared/model/appointment';
import { StartDiagnosy } from 'src/app/shared/model/start-diagnosy';
import { Prescription } from 'src/app/shared/model/prescription';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-add-medicine-add',
  templateUrl: './add-medicine-add.component.html',
  styleUrls: ['./add-medicine-add.component.scss']
})
export class AddMedicineAddComponent implements OnInit {
  appointment: Appointment = new Appointment();
  startDiagnosy: StartDiagnosy = new StartDiagnosy();
  errorMessage: string | null = null;
  appointmentId: number = 0;
  isSubmitting: boolean = false;

  dosagePattern = '^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)?$';

  validateDosage(event: any) {
    const input = event.target.value;
    // Remove multiple spaces, keep only single spaces between words
    event.target.value = input.replace(/\s+/g, ' ').trim();
    
    // Optional: Additional validation to match the pattern
    const regex = new RegExp(this.dosagePattern);
    if (!regex.test(event.target.value)) {
      // Handle invalid input if needed
    }
  }

  validateNumberOfDays(event: any) {
  const input = event.target.value;
  // Ensure only numeric input
  event.target.value = input.replace(/[^0-9]/g, '');
}

  constructor(
    public doctorService: DoctorService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointmentId = +params['apId'];
      this.initializeForm();
    });

    // Fetch medicine details
    this.doctorService.getAllMedicine();
  }

  private initializeForm(): void {
    this.doctorService.formMedicineData = new Prescription();
    this.doctorService.formMedicineData.AppointmentId = this.appointmentId;
    this.doctorService.formMedicineData.IsActive = true;
  }

  onSubmit(medicineform: NgForm) {
    if (this.isSubmitting || !medicineform.valid) {
      this.errorMessage = "Please fill all required fields";
      return;
    }

    this.isSubmitting = true;

    // Create prescription data with the correct MedicineId
    const prescriptionData = {
      ...this.doctorService.formMedicineData,
      AppointmentId: this.appointmentId
    };

    this.doctorService.insertMedicine(prescriptionData).subscribe({
      next: (response) => {
        if (response && response.Value) {
          console.log('Medicine added successfully:', response.Value);
          this.toastr.success('Medicine has been prescribed successfully', 'Success');
          this.errorMessage = null;
          medicineform.resetForm();
          this.initializeForm();
          this.router.navigate(['/doctor/list', this.appointmentId]);
        } else {
          this.handleError('Invalid response from server');
        }
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private handleError(error: any): void {
    console.error('Error adding medicine:', error);
    this.toastr.error('Failed to prescribe medicine', 'Error');

    if (error.status === 400) {
      this.errorMessage = 'Invalid data submitted. Please check all fields.';
    } else if (error.status === 404) {
      this.errorMessage = 'Medicine or appointment not found.';
    } else {
      this.errorMessage = 'Failed to add medicine. Please try again.';
    }

    this.isSubmitting = false;
  }
}