import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LabtestService } from 'src/app/shared/service/labtest.service';
@Component({
  selector: 'app-lab-edit',
  templateUrl: './lab-edit.component.html',
  styleUrls: ['./lab-edit.component.scss']
})
export class LabEditComponent implements OnInit {

  errorMessage: string |null=null;
 constructor(public labService:LabtestService,
   private router:Router,private toastr: ToastrService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
   onSubmit(stForm: NgForm){
    console.log(stForm.value);
 
  //Call Insert Method
 this.Updatetests(stForm);
 
 }
 
 //Insert Method
 Updatetests(stForm: NgForm){
  console.log("inserting...");
  this.labService.Updatetests(stForm.value).subscribe(
    (response)=>{
      console.log(response);
      this.toastr.success('Record has been deleted successfully','EMS v2024');
  
      //insert successfull ,clear error message
      this.errorMessage = null;
  
      //refresh the list anf navigate to the employee list page
      this.labService.getAlltests();
  
      //Redirect to employeee List
      this.router.navigate(['/lab/list']);
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
 
  
 }
 
