import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-labtestadd-edit',
  templateUrl: './labtestadd-edit.component.html',
  styleUrls: ['./labtestadd-edit.component.scss']
})
export class LabtestaddEditComponent implements OnInit {

  errorMessage:string |null=null;

  constructor(public doctorService:DoctorService,
    private router:Router,
    private toastr: ToastrService
  ) { }

   onSubmit(labform:NgForm){
      console.log(labform.value);
      //call insert method
      this.editTest(labform);
      
   //Redirect to Employee List
  this.router.navigate(['/labtestadd/list']);
  labform.reset();
  
  }
   //Insert Method
   editTest(labform:NgForm){
    console.log("Updating...");
    this.doctorService.editTest(labform.value).subscribe(
      (response)=>{
        console.log(response);
        this.toastr.success('Record has been Updated successfully','EMSv2024')
        this.errorMessage=null;
        this.doctorService.getAllTest();

        this.router.navigate(['/labtestadd/list']);

        labform.reset()

      },
      (error)=>{
        console.log(error);
        this.toastr.error('An error Occured','EMSv2024');
        this.errorMessage='An error Occured' + error;
      }
    );
  }

 
  ngOnInit(): void {
    this.doctorService.getAllTest();
  }
}


