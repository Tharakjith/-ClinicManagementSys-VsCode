import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/shared/service/register.service';

@Component({
  selector: 'app-register-edit',
  templateUrl: './register-edit.component.html',
  styleUrls: ['./register-edit.component.scss']
})
export class RegisterEditComponent implements OnInit {
  errorMessage: string |null=null;
  constructor(public registerService:RegisterService,
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
this.registerService.Updateusers(stForm.value).subscribe(
  (response)=>{
    console.log(response);
    this.toastr.success('Record has been deleted successfully','EMS v2024');

    //insert successfull ,clear error message
    this.errorMessage = null;

    //refresh the list anf navigate to the employee list page
    this.registerService.getAllusers();

    //Redirect to employeee List
    this.router.navigate(['/register/list']);
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

  this.registerService.getAllusers();
   this.registerService.getAllRoles();
}
}
