import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-start-diagnosys-edit',
  templateUrl: './start-diagnosys-edit.component.html',
  styleUrls: ['./start-diagnosys-edit.component.scss']
})
export class StartDiagnosysEditComponent implements OnInit {
  
  errorMessage:string |null=null;

  constructor(public doctorService:DoctorService,
    private router:Router,
    private toastr: ToastrService
  ) { }

 //Submit form
 onSubmit(startDiaform:NgForm){
  console.log(startDiaform.value);
  //call insert method
  this.editDiagnosys(startDiaform);
  

  //Redirect to Employee List
  this.router.navigate(['/doctor/startDiagnosys/']);

  //Reset Form
  startDiaform.reset();

}
//Insert Method
editDiagnosys(startDiaform:NgForm){
console.log("Updating...");
this.doctorService.editDiagnosys(startDiaform.value).subscribe(
  (response)=>{
    console.log(response);
    this.toastr.success('Record has been Updated successfully','EMSv2024')
    this.errorMessage=null;
    this.doctorService.getAllDiagnosys();

    this.router.navigate(['/doctor/startDiagnosys']);

    startDiaform.reset()

  },
  (error)=>{
    console.log(error);
    this.toastr.error('An error Occured','CMSv2024');
    this.errorMessage='An error Occured' + error;
  }
);
}

ngOnInit(): void {
 this.doctorService.getAllDoctors();
  }
}
