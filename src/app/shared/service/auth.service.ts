import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router:Router) { }

  loginVerify(loginData: any): Observable<User> {
    return this.httpClient.get<User>(
        `${environment.apiUrl}Logins/${loginData.Username}/${loginData.Password}`
    );
}
public logOutRemoveItems(){
  //clear all session and localstorage keys
  localStorage.removeItem("User_name");
  localStorage.removeItem("AccessRole");
  localStorage.removeItem("JWT Token");

  //redirects to Login
  this.router.navigate(['auth/login']);
}
}