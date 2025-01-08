import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/shared/service/users.service';
@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  //declare variable
 errorMessage: string |null=null;
 constructor(public userService:UsersService,
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
  this.userService.Updateusers(stForm.value).subscribe(
    (response)=>{
      console.log(response);
      this.toastr.success('Record has been deleted successfully','CMS v2024');
  
      //insert successfull ,clear error message
      this.errorMessage = null;
  
      //refresh the list anf navigate to the employee list page
      this.userService.getAllUsers();
  
      //Redirect to employeee List
      this.router.navigate(['/users/list']);
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
    this.userService.getAllUsers();
    this.userService.getAllStaffs();
    this.userService.getAllRoles();
  }
 }
 
