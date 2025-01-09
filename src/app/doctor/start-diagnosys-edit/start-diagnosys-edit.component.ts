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
 onSubmit(empform:NgForm){
  console.log(empform.value);
  //call insert method
  this.editDiagnosys(empform);
  

  //Redirect to Employee List
  this.router.navigate(['/doctor/startDiagnosys']);

  //Reset Form
 empform.reset();

}
//Insert Method
editDiagnosys(empform:NgForm){
console.log("Updating...");
this.doctorService.editDiagnosys(empform.value).subscribe(
  (response)=>{
    console.log(response);
    this.toastr.success('Record has been Updated successfully','EMS v2024')
    this.errorMessage=null;
    this.doctorService.getAllDiagnosys();

    this.router.navigate(['/doctor/startDiagnosys']);

    empform.reset()

  },
  (error)=>{
    console.log(error);
    this.toastr.error('An error Occured','EMS v2024');
    this.errorMessage='An error Occured' + error;
  }
);
}

ngOnInit(): void {
 this.doctorService.getAllDoctors();
  }
}
