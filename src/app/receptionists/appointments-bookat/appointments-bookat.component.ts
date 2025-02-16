import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/shared/model/appointment';
import { Doctoravail } from 'src/app/shared/model/doctoravail';
import { Doctorbyspectn } from 'src/app/shared/model/doctorbyspectn';
import { Specialization } from 'src/app/shared/model/specialization';
import { PatientService } from 'src/app/shared/service/patient.service';

@Component({
  selector: 'app-appointments-bookat',
  templateUrl: './appointments-bookat.component.html',
  styleUrls: ['./appointments-bookat.component.scss']
})

export class AppointmentsBookatComponent implements OnInit {
  errorMessage: string | undefined = undefined;
  specializations: Specialization[] = [];
  doctorspec: Doctorbyspectn[] = [];
  docavail: Doctoravail[] = [];
  selectedSpecializationId: number = 0;
  selectedDoctorId: number = 0;
  selectedAvailabilityId: number = 0;
  consultationFee: number = 0;
  appointment: Appointment = new Appointment();
  patientId: number = 0;
  isSubmitting: boolean = false;

  constructor(
    public patientService: PatientService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribe to route params to get patient ID
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.patientId = +id;
        this.appointment.PatientId = this.patientId;
        console.log('Patient ID set:', this.patientId);
      } else {
        console.error('No patient ID in route params');
        this.errorMessage = 'No patient ID provided';
        this.toastr.error('No patient ID provided', 'Error');
      }
    });

    this.loadSpecializations();
  }

  loadSpecializations(): void {
    this.patientService.getAllSpecializations().subscribe({
      next: (response: Specialization[]) => {
        this.specializations = response;
        console.log('Loaded specializations:', this.specializations);
      },
      error: (error) => {
        console.error('Error loading specializations:', error);
        this.errorMessage = 'Error fetching specializations: ' + error.message;
      }
    });
  }

  onSpecializationChange(): void {
    console.log('Specialization changed to:', this.appointment.SpecializationId);
    if (this.appointment.SpecializationId) {
      this.patientService.getDoctorsBySpecialization(this.appointment.SpecializationId).subscribe({
        next: (response: Doctorbyspectn[]) => {
          this.doctorspec = response;
          this.docavail = [];
          this.consultationFee = 0;
          this.appointment.ConsultationFee = 0;
          this.appointment.TokenNumber = 0;
          this.errorMessage = undefined;
          console.log('Loaded doctors:', this.doctorspec);
        },
        error: (error) => {
          console.error('Error loading doctors:', error);
          this.errorMessage = 'Error fetching doctors: ' + error.message;
        }
      });
    }
  }

  onDoctorChange(): void {
    console.log('Doctor changed to:', this.appointment.DoctorId);
    if (this.appointment.DoctorId) {
      // Get doctor availability
      this.patientService.getDoctorAvailability(this.appointment.DoctorId).subscribe({
        next: (response: Doctoravail[]) => {
          this.docavail = response;
          console.log('Loaded availability:', this.docavail);
          if (this.docavail.length === 0) {
            this.errorMessage = 'No availability for this doctor.';
          } else {
            this.errorMessage = undefined;
          }
        },
        error: (error) => {
          console.error('Error loading availability:', error);
          this.errorMessage = 'Error fetching availability: ' + error.message;
        }
      });
      // Get consultation fee
      this.patientService.getConsultationFeeByDoctorId(this.appointment.DoctorId).subscribe({
        next: (response: number) => {
          this.consultationFee = response;
          this.appointment.ConsultationFee = response;
          console.log('Consultation fee set:', this.consultationFee);
          this.errorMessage = undefined;
        },
        error: (error) => {
          console.error('Error fetching consultation fee:', error);
          this.errorMessage = 'Error fetching consultation fee: ' + error.message;
          this.consultationFee = 0;
          this.appointment.ConsultationFee = 0;
        }
      });
    }
  }

  validateAppointmentDate(): boolean {
    if (!this.appointment.AppointmentDate) {
      this.errorMessage = 'Please select an appointment date.';
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(this.appointment.AppointmentDate);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);
    console.log('Validating date:', {
      selectedDate,
      today,
      maxDate
    });
    if (selectedDate < today) {
      this.errorMessage = 'Appointment date cannot be in the past.';
      return false;
    }
    if (selectedDate > maxDate) {
      this.errorMessage = 'Appointment date must be within the next 7 days.';
      return false;
    }
    const selectedDayName = selectedDate.toLocaleString('en-US', { weekday: 'long' });
    const isAvailableDay = this.docavail.some(a => a.Weekday === selectedDayName);
    console.log('Day validation:', {
      selectedDayName,
      isAvailableDay,
      availableDays: this.docavail.map(a => a.Weekday)
    });
    if (!isAvailableDay) {
      this.errorMessage = 'Doctor is not available for the date';
      return false;
    }
    this.errorMessage = undefined;
    return true;
  }

  onGenerateToken(): void {
    console.log('Generating token with:', {
      doctorId: this.appointment.DoctorId,
      date: this.appointment.AppointmentDate,
      availabilityId: this.selectedAvailabilityId
    });
    if (!this.validateAppointmentDate() || !this.selectedAvailabilityId) {
      if (!this.selectedAvailabilityId) {
        this.errorMessage = 'Please select an availability slot.';
      }
      return;
    }
    this.patientService.generateToken(
      this.appointment.DoctorId,
      this.appointment.AppointmentDate,
      this.selectedAvailabilityId
    ).subscribe({
      next: (response: any) => {
        console.log('Token generation response:', response);
        if (response.success) {
          this.appointment.TokenNumber = response.tokenNumber;
          this.errorMessage = undefined;
        } else {
          this.errorMessage = response.message || 'Error generating token';
          this.appointment.TokenNumber = 0;
        }
      },
      error: (error) => {
        console.error('Token generation error:', error);
        this.errorMessage = 'Error generating token: ' + error.message;
        this.appointment.TokenNumber = 0;
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (this.isSubmitting) {
      return;
    }
    if (!this.validateForm(form)) {
      return;
    }

    const appointmentDate = new Date(this.appointment.AppointmentDate);
    this.appointment.AppointmentDate = appointmentDate.toISOString().split('T')[0];

    const appointmentData = {
      ...this.appointment,
      AvailabilityId: this.selectedAvailabilityId,
      ConsultationFee: this.consultationFee
    };
    console.log('Submitting appointment with data:', appointmentData);
    this.isSubmitting = true;
    this.patientService.bookAppointment(appointmentData).subscribe({
      next: (response) => {
        console.log('Booking success:', response);
        this.toastr.success('Appointment placed successfully!');
        this.resetForm(form);
        // Navigate using the patient ID instead of appointment ID
        this.router.navigate(['/patients/bill', appointmentData.PatientId]);
      },
      error: (error) => {
        console.error('Booking error:', error);
        this.isSubmitting = false;
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error booking appointment: ' + error.message;
        }
        this.toastr.error(this.errorMessage);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private validateForm(form: NgForm): boolean {
    const validationErrors = [];
    if (!form.valid) {
      validationErrors.push('Please fill in all required fields.');
    }
    if (!this.appointment.PatientId) {
      validationErrors.push('Patient ID is required.');
    }
    if (!this.appointment.DoctorId) {
      validationErrors.push('Please select a doctor.');
    }
    if (!this.appointment.SpecializationId) {
      validationErrors.push('Please select a specialization.');
    }
    if (!this.appointment.TokenNumber) {
      validationErrors.push('Please generate a token before booking.');
    }
    if (!this.appointment.ConsultationFee || this.appointment.ConsultationFee <= 0) {
      validationErrors.push('Invalid consultation fee.');
    }
    if (!this.selectedAvailabilityId) {
      validationErrors.push('Please select an availability slot.');
    }
    if (!this.appointment.AppointmentDate) {
      validationErrors.push('Please select an appointment date.');
    }
    if (validationErrors.length > 0) {
      this.errorMessage = validationErrors.join(' ');
      console.error('Validation errors:', validationErrors);
      return false;
    } else {
      this.errorMessage = undefined;
    }
    console.log('Form validation passed with data:', this.appointment);
    return true;
  }

  private resetForm(form: NgForm): void {
    form.reset();
    this.appointment = new Appointment();
    this.consultationFee = 0;
    this.selectedAvailabilityId = 0;
    this.docavail = [];
    this.doctorspec = [];
    this.errorMessage = undefined;
  }

  cancelRegistration() {
    // Redirect to the list page
    this.router.navigate(['/patients/list']);
  }
  
}