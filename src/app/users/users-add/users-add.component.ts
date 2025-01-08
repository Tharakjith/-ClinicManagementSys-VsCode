import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/shared/service/users.service';
@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {

  errorMessage: string |null=null;
  constructor(public userService:UsersService,
    private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.getAllUsers();
    this.userService.getAllStaffs();
    this.userService.getAllRoles();
  }
//submit form
onSubmit(stForm: NgForm){
  console.log(stForm.value);

  //Call insert method
this.addUsers(stForm);
  //Reset Form
  this.router.navigate(['/users/list'])
  stForm.reset();

  
}
//Insert method
addUsers(stForm:NgForm){
  console.log("Inserting staff add");
  this.userService.insertuser(stForm.value).subscribe(
    (response)=>{
      console.log(response);
      this.toastr.success('The record has been successfully inserted','CMS v2025');
     

      //Insert successful clear error message
      this.errorMessage=null;
      this.userService.getAllUsers();
      this.router.navigate(['/users/list'])
  stForm.reset();
    },
    (error)=>{
      console.log(error);
      this.toastr.error('An error occurred ','CMS v2025');
      this.errorMessage ='An error occurred ' +error;
 
     
    }
  )
};
}





 




