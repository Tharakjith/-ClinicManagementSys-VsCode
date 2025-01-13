import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DmanagementService } from 'src/app/shared/service/dmanagement.service';

@Component({
  selector: 'app-doctormgmt-add',
  templateUrl: './doctormgmt-add.component.html',
  styleUrls: ['./doctormgmt-add.component.scss']
})
export class DoctormgmtAddComponent implements OnInit {

  errorMessage: string |null=null;
    constructor(public doctormanagementService:DmanagementService,
      private router:Router,private toastr: ToastrService) { }
  
    ngOnInit(): void {
      this.doctormanagementService.getAlldoctors();
      this.doctormanagementService.getAllSpecilization();
      this.doctormanagementService.getAllstaff();
      this.doctormanagementService.getAllusers();
    }
  //submit form
  onSubmit(stForm: NgForm){
    console.log(stForm.value);
  
    //Call insert method
  this.adddoctor(stForm);
    //Reset Form
    //this.router.navigate(['/doctormanagement/list'])
    stForm.reset();
  
    
  }
  //Insert method
  adddoctor(stForm: NgForm) {
    console.log("Attempting to add doctor");
  
    this.doctormanagementService.insertdoctors(stForm.value).subscribe(
      (response) => {
        if (response) {
          this.toastr.success('Doctor successfully registered.', 'CMS v2025');
          this.errorMessage = null;
          this.doctormanagementService.getAlldoctors();
          
         
        } 
      },
      (error)=>{
        console.log(error);
        this.toastr.error('An error occurred ','CMS v2025');
        this.errorMessage ='An error occurred ' +error;
   
       
      }
    );
  }
}