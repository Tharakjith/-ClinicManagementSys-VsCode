import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted:boolean =false;
  error: string ='';

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    //create Reactive form
     this.loginForm=this.formBuilder.group({
      Username:['',[Validators.required]],
      Password:['',[Validators.required]]
     });
  }

  //get all controls for validation
  get formControls(){
    return this.loginForm.controls;
  }
  //Functionality
  loginCredentials():void{
    //setting value is submitted
    this.isSubmitted=true;
    //checking form ,if it is invalid
    if(this.loginForm!.invalid){
      this.toastr.error('please enter username and password','EMS v2024')
      this.error ="Please enter username and password"
      return;
    }
    //checking form if it is valid
    if(this.loginForm.valid){
      this.error='';
      console.log(this.loginForm.value);

      //checking login credentials
      this.authService.loginVerify(this.loginForm.value)
      .subscribe((response)=>{
        console.log(response.RoleId);
        //based on role , need to redirect
        if(response == null){
          this.error="Invalid username and password"
        }
        if(response.RoleId === 1){
             

             console.log("Admin");
             //Local storage 
             localStorage.setItem("User_name",response.Username);
             localStorage.setItem("AccessRole",response.RoleId.toString());
             localStorage.setItem("JWT Token",response.Token);
             this.router.navigate(['auth/admin']);
        }else if(response.RoleId === 2){
             console.log("Doctor");
             localStorage.setItem("User_name",response.Username);
             localStorage.setItem("AccessRole",response.RoleId.toString());
             localStorage.setItem("JWT Token",response.Token);
             
             this.router.navigate(['auth/doctor']);
        }
        else if(response.RoleId === 3){
          console.log("Receptionist");
          localStorage.setItem("User_name",response.Username);
          localStorage.setItem("AccessRole",response.RoleId.toString());
          localStorage.setItem("JWT Token",response.Token);
          
          this.router.navigate(['auth/receptionist']);
     }
     else if(response.RoleId === 4){
      console.log("Pharmacist");
      localStorage.setItem("User_name",response.Username);
      localStorage.setItem("AccessRole",response.RoleId.toString());
      localStorage.setItem("JWT Token",response.Token);
      
      this.router.navigate(['auth/pharmacist']);
 }
 else if(response.RoleId === 5){
  console.log("Lab Technician");
  localStorage.setItem("User_name",response.Username);
  localStorage.setItem("AccessRole",response.RoleId.toString());
  localStorage.setItem("JWT Token",response.Token);
  
  this.router.navigate(['auth/labtechnician']);
}
        else{
          this.error ="Sorry.. Invalid credentials not allowed";
        }

      },
    //based on role need to redirect
    (error)=>{
      console.log(error);
      this.error ="Invalid username and password";
      
    });
    }
  }

}
