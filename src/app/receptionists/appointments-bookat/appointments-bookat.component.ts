import { formatDate } from '@angular/common';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { Appointment } from 'src/app/shared/model/appointment';
// import { Availability } from 'src/app/shared/model/availability';
import { Doctors } from 'src/app/shared/model/doctors';
import { Specialization } from 'src/app/shared/model/specialization';
import { PatientService } from 'src/app/shared/service/patient.service';

@Component({
  selector: 'app-appointments-bookat',
  templateUrl: './appointments-bookat.component.html',
  styleUrls: ['./appointments-bookat.component.scss']
})
export class AppointmentsBookatComponent implements OnInit {

  //declare variables
  errorMessage: string | null = null;
  specializations: Specialization[] = [];
  doctors: Doctors[] = [];
  //availabilities: Availability[] = [];
  selectedSpecializationId: number = 0;
  selectedDoctorId: number = 0;
  selectedAvailabilityId: number = 0;
  consultationFee: number = 0;
  //appointment: Appointment = new Appointment();
  patientId: number = 0;

  constructor(public patientService: PatientService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,) { }
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    // Retrieve Patient ID from route
    // this.route.params.subscribe((params) => {
    //   this.patientId = +params['id']; // Convert to number
    //   if (this.patientId) {
    //     this.appointment.PatientId = this.patientId; // Populate PatientId in the appointment object
    //   }
    // });

    // Load specializations
    //this.loadSpecializations();
  }

  // Load all specializations
  // loadSpecializations(): void {
  //   this.patientService.getAllSpecializations().subscribe(
  //     (response: Specialization[]) => {
  //       this.specializations = response;
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error fetching specializations: ' + error.message;
  //     }
  //   );
  // }

  // Load doctors based on selected specialization
  // onSpecializationChange(): void {
  //   this.patientService.getDoctorsBySpecialization(this.selectedSpecializationId).subscribe(
  //     (response: Doctors[]) => {
  //       this.doctors = response;
  //       this.selectedDoctorId = 0; // Reset selected doctor
  //       this.consultationFee = 0; // Reset consultation fee
  //       this.availabilities = []; // Reset availability list
  //       this.appointment.TokenNumber = 0; // Reset token number
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error fetching doctors: ' + error.message;
  //     }
  //   );
  // }

  // Load availability based on selected doctor
  // onDoctorChange(): void {
  //   this.patientService.getDoctorAvailability(this.selectedDoctorId).subscribe(
  //     (response: Availability[]) => {
  //       this.availabilities = response;

  //       // Fetch consultation fee from the selected doctor
  //       const selectedDoctor = this.doctors.find((doc) => doc.DoctorId === this.selectedDoctorId);
  //       if (selectedDoctor) {
  //         this.consultationFee = selectedDoctor.ConsultationFee;
  //         this.appointment.ConsultationFee = this.consultationFee;
  //       }

  //       // Reset token number
  //       this.appointment.TokenNumber = 0;
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error fetching doctor availability: ' + error.message;
  //     }
  //   );
  // }


  // Generate token number based on appointment details
  // onGenerateToken(): void {
  //   const { PatientId } = this.appointment;
  //   const { AppointmentDate } = this.appointment;
  //   const timeSlotId = this.selectedAvailabilityId;

  //   // Validate required fields
  //   if (!PatientId || !AppointmentDate || !this.selectedDoctorId || !timeSlotId) {
  //     this.errorMessage = 'Please fill in all the required fields before generating a token.';
  //     return;
  //   }

  //   this.patientService.generateToken(this.selectedDoctorId, AppointmentDate, timeSlotId).subscribe(
  //     (response: number) => {
  //       this.appointment.TokenNumber = response;
  //       this.errorMessage = null; // Clear error message
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error generating token: ' + error.message;
  //     }
  //   );
  // }


  // Submit the appointment form
  onSubmit(patform: NgForm): void {
    // if (!this.appointment.TokenNumber) {
    //   this.errorMessage = 'Please generate a token number before booking the appointment.';
    //   return;
    // }

    // this.patientService.bookAppointment(this.appointment).subscribe(
    //   (response: any) => {
    //     this.toastr.success('Appointment booked successfully!', 'Success');
    //     this.errorMessage = null;
    //     patform.reset();
    //     this.router.navigate(['/patients/list']); // Redirect to patients list
    //   },
    //   (error) => {
    //     this.errorMessage = 'Error booking appointment: ' + error.message;
    //   }
    // );
  }
}