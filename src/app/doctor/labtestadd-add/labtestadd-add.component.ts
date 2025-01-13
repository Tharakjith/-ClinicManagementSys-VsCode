import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/shared/model/appointment';
import { StartDiagnosy } from 'src/app/shared/model/start-diagnosy';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-labtestadd-add',
  templateUrl: './labtestadd-add.component.html',
  styleUrls: ['./labtestadd-add.component.scss']
})
export class LabtestaddAddComponent implements OnInit {
    //declare error message
    appointment:Appointment=new Appointment();
    startDiagnosys:StartDiagnosy=new StartDiagnosy();
    errorMessage:string |null=null;
    AppointmentId : number = 0;
    todayDate: string = '';
  //declare error message
  

 constructor(public doctorService:DoctorService,
    private router:Router,
    private toastr: ToastrService,
    private route:ActivatedRoute  ) { }

  ngOnInit(): void {
   
      // Retrieve Patient ID from route
      this.route.paramMap.subscribe((params) => {
        this.AppointmentId = Number(params.get('labadd'));
        this.startDiagnosys.AppointmentId = this.AppointmentId;
      });     
      console.log(this.AppointmentId);
  
      console.log(this.AppointmentId);
   
    this.doctorService.getAllTest();
  }

  
    //Submit form
    onSubmit(labform:NgForm){

      
      console.log(labform.value);
      //call insert method
      this.addLabtest(labform);
      //Reset Form
     labform.reset();
  
      //Redirect to Employee List
      this.router.navigate(['/labtestadd/list']);
  
    }
     //Insert Method
  addLabtest(labform:NgForm){
    console.log("inserting...");
    this.doctorService.insertTest(labform.value).subscribe(
      (response)=>{
        console.log(response);
        this.toastr.success('Record has been inserted successfully','EMSv2024')
        this.errorMessage=null;
        this.doctorService.getAllTest();

        this.router.navigate(['/labtestadd/list']);

        labform.reset()

      },
      (error)=>{
        console.log(error);
        this.toastr.error('An error Occured','EMSv2024')
        this.errorMessage='An error Occured' + error;
      }
    );
  }

}

