import { Component, OnInit } from '@angular/core';
import { DoctormanagementService } from 'src/app/shared/service/doctormanagement.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-doctormanagement-add',
  templateUrl: './doctormanagement-add.component.html',
  styleUrls: ['./doctormanagement-add.component.scss']
})
export class DoctormanagementAddComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(public doctormanagementService: DoctormanagementService,
    private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
//SubmitForm

onSubmit(medForm: NgForm){
  console.log(medForm.value);

   //Call Insert Method
    this.insertDoctors(medForm);

   //Reset Form
   medForm.reset();

   //Redirect to Employee List
 this.router.navigate(['/doctormanagement/list']);


}

  //Insert Method
  insertDoctors(medForm: NgForm){
  console.log("inserting...");
  this.doctormanagementService.insertDoctors(medForm.value).subscribe(
    (response)=>{
      console.log(response);
      this.toastr.success('Record has been inserted successfully','EMSv2024');

  //insert successfull ,clear error message
  this.errorMessage = null;

  //refresh the list anf navigate to the medicine list page
  this.doctormanagementService.getAllDoctors();

  //Redirect to medicine List
  this.router.navigate(['/doctormanagement/list']);
  //Reset Form
   medForm.reset();

  },
    (error)=>{
      console.log(error);
      this.toastr.error('An error occurred ','EMSv2024');
      this.errorMessage ='An error occured!' + error;
  }
);
}
}




 

