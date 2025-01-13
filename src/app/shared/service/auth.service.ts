import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router:Router) { }

  //verify username and password
  public loginVerify(user:User){
    //call webapi for checking username and password
    return this.httpClient.get<User>(environment.apiUrl+'Logins/'+user.Username+'/'+user.Password);
  }

  //logout 
  public logOutRemoveItems(){
    //clear all session and localstorage keys
    localStorage.removeItem("User_name");
    localStorage.removeItem("AccessRole");
    localStorage.removeItem("JWT Token")
    // redirect to login
    this.router.navigate(['auth/login']);
  }
}
