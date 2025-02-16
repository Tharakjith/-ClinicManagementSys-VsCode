import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/shared/model/appointment';
import { StartDiagnosy } from 'src/app/shared/model/start-diagnosy';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-start-diagnosys-add',
  templateUrl: './start-diagnosys-add.component.html',
  styleUrls: ['./start-diagnosys-add.component.scss']
})
export class StartDiagnosysAddComponent implements OnInit {
  diagnosisPattern = /^[A-Za-z]+( [A-Za-z]+)*$/;
  doctorId!: number;

  isValidDiagnosis(value: string): boolean {
    return this.diagnosisPattern.test(value);
  }

  symptomsPattern = /^[A-Za-z]+( [A-Za-z]+)*$/;

  isValidSymptoms(value: string): boolean {
    return this.symptomsPattern.test(value);
  }
  doctorNotePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;

  isValidDoctorNote(value: string): boolean {
    return this.doctorNotePattern.test(value);
  }
  appointment: Appointment = new Appointment();
  errorMessage: string | null = null;
  minDate: string | undefined;
  
  constructor(
     // Set today's date as minDate in "YYYY-MM-DD" format
     public doctorService: DoctorService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) 
  {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits
    return `${year}-${month}-${day}`;}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const appointmentId = +params['appId'];
      if (appointmentId) {
        this.appointment.AppointmentId = appointmentId;
        
        // Ensure formDiagnosysData is initialized
        if (!this.doctorService.formDiagnosysData) {
          this.doctorService.formDiagnosysData = new StartDiagnosy();
        }
  
        this.doctorService.formDiagnosysData.AppointmentId = appointmentId;
      }
    });
      // Ensure DiagnosysDate is set
  const today = new Date();
  this.doctorService.formDiagnosysData.DiagnosysDate = today.toISOString().split('T')[0];
}
  
  
  

onSubmit(form: NgForm): void {
  if (form.valid) {
    console.log('Form Data:', this.doctorService.formDiagnosysData);

    this.doctorService.insertDiagnosys(this.doctorService.formDiagnosysData).subscribe(
      (response) => {
        console.log('Success:', response);
        this.toastr.success('Diagnosis added successfully');
        this.router.navigate(['/doctor/diagnosis/list', this.appointment.AppointmentId]);
      },
      (error) => {
        console.error('Error adding diagnosis:', error);
        this.toastr.error('Error adding diagnosis');
        this.errorMessage = error.message;
      }
    );
  } else {
    console.warn('Form is invalid:', form);
  }


  }

  addmedicines(): void {
    if (this.appointment.AppointmentId) {
      this.router.navigate(['/doctor/medadd', this.appointment.AppointmentId]);
    }
  }

  addlabtests(): void {
    if (this.appointment.AppointmentId) {
      this.router.navigate(['/doctor/labadd', this.appointment.AppointmentId]);
    }
  }



}