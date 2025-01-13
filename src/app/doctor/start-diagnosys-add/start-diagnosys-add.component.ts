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
  
  //declare error message
  appointment:Appointment=new Appointment();
  errorMessage:string |null=null;
  AppointmentId : number = 0;
  todayDate: string = '';

  constructor(public doctorService:DoctorService,
    private router:Router,
    private toastr: ToastrService,
    private route:ActivatedRoute  ) { }

  ngOnInit(): void {
    // Retrieve Patient ID from route
    this.route.paramMap.subscribe((params) => {
      this.AppointmentId = Number(params.get('appId'));
      this.appointment.AppointmentId = this.AppointmentId;
    });      
    console.log(this.AppointmentId);


    // Set today's date in ISO format


    // const today = new Date();
    // this.todayDate = today.toISOString().split('T')[0];
    // this.doctorService.formDiagnosysData.DiagnosysDate = this.todayDate;

    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
    this.doctorService.formDiagnosysData.DiagnosysDate = this.todayDate;



  
    this.doctorService.getAllDoctors();
  }
  
  // //Submit form
  // onSubmit(formDiagnosysData: NgForm): void {
  //   if (formDiagnosysData.valid) {
  //     this.addDiagnosys(formDiagnosysData);
  //     formDiagnosysData.reset();
  //     this.router.navigate(['/doctor/startdiagnosys/list']);
  //   } else {
  //     this.toastr.error('Please fill all required fields.', 'Validation Error');
  //   }
  // }

  onSubmit(formDiagnosysData: NgForm): void {
    if (formDiagnosysData.valid) {
      // Pass the form data directly to the service
      this.addDiagnosys(formDiagnosysData.value);
      formDiagnosysData.reset();
      this.router.navigate(['doctor/diagnosis/list']);
    } else {
      this.toastr.error('Please fill all required fields.', 'Validation Error');
    }
  }
  
  //Insert Method
  addDiagnosys(formDiagnosysData: NgForm): void {
    console.log("Inserting...");
    console.log('Form Data:', formDiagnosysData.value);  // Log form data to verify it's correct
  
    this.doctorService.insertDiagnosys(formDiagnosysData.value).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Record has been inserted successfully', 'CMSv2024');
        this.errorMessage = null;
        this.doctorService.getAllDiagnosys();
        this.router.navigate(['add/:appId']);
      },
      (error) => {
        console.log(error);
        this.toastr.error('An error occurred', 'CMSv2024');
        this.errorMessage = 'An error occurred: ' + error.message;
      }
    );
  }
  

  addmedicines(): void {
    // Redirect to the booking appointment page
    this.router.navigate(['/doctor/medadd/:appId']);
    }
  
  addlabtests(): void {
    // Redirect to the booking appointment page
    this.router.navigate(['/doctor/labtestadd']);
    }

}
