import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { doesNotReject } from 'node:assert';
import { User } from '../model/user';
import { Staff } from '../model/staff';
import { Role } from '../model/role';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  user: User[] = [];
  staff: Staff[] = [];
  role: Role[] = [];
  formStaffData: User = new User();

  
 
  createdDate: any;
  
  constructor(private httpClient: HttpClient) {}

  ///1- Get All Employees
  getAllusers(): void {
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
  insertUsers(user:User): Observable<any>{
    console.log("Insert: In Service");
    console.log(user);
    return this.httpClient.post(environment.apiUrl+'Registrations',user);
    }

  // 3. Get all departments
  getAllStaffs(): void {
    this.httpClient.get(environment.apiUrl + 'Registrations/v2')
      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.staff= response.Value;
          console.log(this.staff);
        }
      })
      .catch((error) => {
        console.log('Error occured:', error);
      });
  }
  

  // 3. Get all departments
  getAllRoles(): void {
    this.httpClient.get(environment.apiUrl + 'Registrations/v5')
      .toPromise()
      .then((response?: any) => {
        console.log('Roles Response:', response); // Debug the API response
        if (response.Value) {
          this.role = response.Value;
          console.log(this.role);
        } else {
          console.error('Roles not found in response');
        }
      })
      .catch((error) => {
        console.log('Error occurred while fetching roles:', error);
      });
  }
  
  // 4. Update a staff
  Updateusers(user:User):Observable<any>{
    console.log("Update : In service");
    return this.httpClient.put(environment.apiUrl+'Registrations/'+user.RegistrationId,user);
  }
}

