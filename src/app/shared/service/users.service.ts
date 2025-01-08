import { Injectable } from '@angular/core';
import { User } from '../model/user';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { doesNotReject } from 'node:assert';
import { Role } from '../model/role';
import { Staff } from '../model/staff';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: User[] = [];
  role: Role[] = [];
  staff: Staff[] = [];
  formUserData: User = new User();
  Staff: Staff = new Staff();
  RegisteredDate: any;
  
  constructor(private httpClient: HttpClient) { }

  
  ///1- Get All Employees
  getAllUsers(): void {
    this.httpClient.get(environment.apiUrl + 'Registrations')

      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.user = response.Value;
          console.log(this.user);
        }
      })
      .catch((error) => {
        console.log('Error occured:', error);
      });
  }
  // 2- Insert employee
  insertuser(user:User): Observable<any>{
    console.log("Insert: In Service");
    console.log(user);
    return this.httpClient.post(environment.apiUrl+'Registrations',user);
    }

  // 3. Get all departments
  getAllRoles(): void {
    this.httpClient.get(environment.apiUrl + 'Registrations/v5')
      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.role= response.Value;
          console.log(this.role);
        }
      })
      .catch((error) => {
        console.log('Error occured:', error);
      });
  }
  
// 3. Get all departments
getAllStaffs(): void {
  this.httpClient.get(environment.apiUrl + 'Registrations/v2')
    .toPromise()
    .then((response?: any) => {
      if (response.Value) {
        this.role= response.Value;
        console.log(this.staff);
      }
    })
    .catch((error) => {
      console.log('Error occured:', error);
    });
}


  // 4. Update a staff
  Updateusers(user:User):Observable<any>{
    console.log("Update : In service");
    return this.httpClient.put(environment.apiUrl+'Registrations/'+user.RegistrationId,user);
  }
}





 
