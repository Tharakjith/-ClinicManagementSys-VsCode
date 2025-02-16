import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/shared/model/appointment';
import { AppointmentpatientViewmodel } from 'src/app/shared/model/appointmentpatient-viewmodel';
import { Labtest } from 'src/app/shared/model/labtest';
import { StartDiagnosy } from 'src/app/shared/model/start-diagnosy';
import { TestPrescription } from 'src/app/shared/model/test-prescription';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-labtestadd-add',
  templateUrl: './labtestadd-add.component.html',
  styleUrls: ['./labtestadd-add.component.scss']
})
export class LabtestaddAddComponent implements OnInit {
    //declare error message
    appointment:Appointment=new Appointment();
    startDiagnosy:StartDiagnosy=new StartDiagnosy();
    errorMessage:string |null=null;
    AppointmentId : number = 0;
    todayDate: string = '';
    sampleItems: string[] = [
      'Blood',
      'Urine',
      'Saliva',
      'Sputum',
      'Feces',
      'Body tissues'
    ];
  //declare error message
  

 constructor(public doctorService:DoctorService,
    private router:Router,
    private toastr: ToastrService,
    private route:ActivatedRoute  ) { }

    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.AppointmentId = Number(params.get('apId'));
        this.startDiagnosy.AppointmentId = this.AppointmentId;
        this.doctorService.getAllLabtest();
      });     
      
      // this.doctorService.getAllLabtest();
    }


    //Submit form
    onSubmit(labform:NgForm){

      
      console.log(labform.value);
      this.addLabtest(labform);
      //Reset Form
     labform.reset();
  
      //Redirect to Employee List
      this.router.navigate(['doctor/labtestadd/list']);
  
    }

    insertDiagnosys(doctor: AppointmentpatientViewmodel): void {
      // Redirect to the booking appointment page
      this.router.navigate(['/doctor/add/'+doctor.AppointmentId]);
  }
    addLabtest(labform: NgForm) {
      const payload: TestPrescription = {
        AppointmentId: this.AppointmentId,
        LabTestId: labform.value.LabTestId,
        SampleItem: labform.value.SampleItem,
        IsActive: labform.value.IsActive || false,
        patient: {
          // Add patient details if available
          // You might need to get this from another service or component
          patientId: this.appointment.PatientId // Adjust based on your actual model
        },
        labtest: new Labtest,
        appointment: new Appointment
      };
    
      console.log('Payload:', payload);
    
      this.doctorService.insertTest(payload).subscribe({
        next: (response) => {
          this.toastr.success('Lab Test Added', 'Success');
          this.router.navigate(['doctor/labtest-list']);
        },
        error: (error) => {
          console.error('Insertion Error:', error.error);
          this.toastr.error('Failed to add Lab Test', 'Error');
        }
      });
    }
  }