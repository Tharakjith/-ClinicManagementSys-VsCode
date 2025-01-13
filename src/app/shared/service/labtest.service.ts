import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { doesNotReject } from 'node:assert';
import { Labtest } from '../model/labtest';


@Injectable({
  providedIn: 'root'
})
export class LabtestService {
  labs: Labtest[] = [];
  
  formlabData: Labtest = new Labtest();
  
  createdDate: any;
  
  constructor(private httpClient: HttpClient) {}

  ///1- Get All Employees
  getAlltests(): void {
    this.httpClient.get(environment.apiUrl + 'Labs')

      .toPromise()
      .then((response?: any) => {
        if (response.Value) {
          this.labs = response.Value;
          console.log(this.labs);
        }
      })
      .catch((error) => {
        console.log('Error occured:', error);
      });
  }
  // 2- Insert employee
  inserttests(labs:Labtest): Observable<any>{
    console.log("Insert: In Service");
    console.log(labs);
    return this.httpClient.post(environment.apiUrl+'Labs',labs);
    }

  

  // 4. Update a staff
  Updatetests(labs:Labtest):Observable<any>{
    console.log("Update : In service");
    return this.httpClient.put(environment.apiUrl+'Labs/'+labs.LabTestId,labs);
  }
}





  