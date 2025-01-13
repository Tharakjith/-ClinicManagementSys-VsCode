import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/shared/service/register.service';

@Component({
  selector: 'app-register-add',
  templateUrl: './register-add.component.html',
  styleUrls: ['./register-add.component.scss']
})
export class RegisterAddComponent implements OnInit {

  errorMessage: string |null=null;
  constructor(public registerService:RegisterService,
    private router:Router,private toastr: ToastrService) { }
    ngOnInit(): void {
      this.registerService.getAllusers();
    this.registerService.getAllRoles();
    }
  //submit form
  onSubmit(stForm: NgForm){
    console.log(stForm.value);
  
    //Call insert method
  this.addUser(stForm);
    //Reset Form
    this.router.navigate(['/register/list'])
    stForm.reset();
  
    
  }
  //Insert method
  addUser(stForm:NgForm){
    console.log("Inserting staff add");
    this.registerService.insertUsers(stForm.value).subscribe(
      (response)=>{
        console.log(response);
        this.toastr.success('The record has been successfully inserted','CMS v2025');
       
  
        //Insert successful clear error message
        this.errorMessage=null;
        this.registerService.getAllusers();
        this.router.navigate(['/register/list'])
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
  
  
  
  





  