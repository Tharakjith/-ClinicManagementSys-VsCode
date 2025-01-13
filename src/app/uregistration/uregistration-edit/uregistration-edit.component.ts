import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from 'src/app/shared/service/registration.service';

@Component({
  selector: 'app-uregistration-edit',
  templateUrl: './uregistration-edit.component.html',
  styleUrls: ['./uregistration-edit.component.scss']
})
export class UregistrationEditComponent implements OnInit {

  errorMessage: string |null=null;
  constructor(public registrationService:RegistrationService,
    private router:Router,private toastr: ToastrService) { }
 
 
  
  //SubmitForm

 onSubmit(stForm: NgForm){
  console.log(stForm.value);

//Call Insert Method
this.Updateusers(stForm);

}

//Insert Method
Updateusers(stForm: NgForm){
console.log("inserting...");
this.registrationService.Updateusers(stForm.value).subscribe(
  (response)=>{
    console.log(response);
    this.toastr.success('Record has been deleted successfully','EMS v2024');

    //insert successfull ,clear error message
    this.errorMessage = null;

    //refresh the list anf navigate to the employee list page
    this.registrationService.getAllusers();

    //Redirect to employeee List
    this.router.navigate(['/uregistration/list']);
    //Reset Form
    stForm.reset();

  },
  (error)=>{
    console.log(error);
    this.toastr.error('An error occurred ','CMS v2024');
    this.errorMessage ='An error occured!' + error;
  }
);
}

ngOnInit(): void {
  //get all departments

  this.registrationService.getAllusers();
   this.registrationService.getAllRoles();
}
}