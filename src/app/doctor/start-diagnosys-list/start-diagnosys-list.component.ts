import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StartDiagnosy } from 'src/app/shared/model/start-diagnosy';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-start-diagnosys-list',
  templateUrl: './start-diagnosys-list.component.html',
  styleUrls: ['./start-diagnosys-list.component.scss']
})
export class StartDiagnosysListComponent implements OnInit {
  page: number = 1;
  pageSize: number = 6;
  searchTerm: string = "";

  constructor(public doctorService: DoctorService,
    private router:Router, private toastr: ToastrService
  ) { }
  //Lifecycle Hook
  ngOnInit(): void {
    console.log("Hai I am Employee List Compnent !....");
    this.doctorService.getAllDiagnosys();
  }
  //search method
  //1. Filter Based on searchterm, employee service.employees should populate
  filteredDiagnosys() {
    if (!this.searchTerm) {
      return this.doctorService.startDiagnosy;
    }
    //2. Return filteredEmployeesList
    const searchTermLower = this.searchTerm.toLowerCase();

    return this.doctorService.startDiagnosy.filter(e => {
      const empCode = `${e.HistoryId}`.toLocaleLowerCase();
      return (
        e.Diagnosis?.toLowerCase().includes(searchTermLower) ||
        empCode.includes(searchTermLower)
      );


      //e.EmployeeId?.includes(searchTermLower)

    });
  }

  editDiagnosys(startDiagnosy: StartDiagnosy): void {
    console.log(startDiagnosy);
    //Call Populate Employee
    this.populateDiagnosysData(startDiagnosy);
    this.router.navigate(['/startDiagnosys/edit/'+startDiagnosy.AppointmentId]);
   

  }
  //Getting Employee
  populateDiagnosysData(startDiagnosy: StartDiagnosy) {
    console.log("Inside Populate method");
    console.log(startDiagnosy)
    //transform Date Format as YYYY-MM-DD
    //Using Date Pipe 
    var datePipe = new DatePipe("en-UK");
    let foemattedDate: any = datePipe.transform(startDiagnosy.DiagnosysDate, 'dd-MM-yyyy');
    startDiagnosy.DiagnosysDate = foemattedDate;
    this.doctorService.formDiagnosysData = { ...startDiagnosy };
    
     datePipe.transform(startDiagnosy.NextVisiting, 'dd-MM-yyyy');
     startDiagnosy.NextVisiting = foemattedDate;
    this.doctorService.formDiagnosysData = { ...startDiagnosy };//spread operator ...

  }  
  
  deleteDiagnosys(startDiagnosy: StartDiagnosy){
    //confirmation
    if(startDiagnosy.IsActive==true){


    if(confirm("Are you sure to DELETE this record?")) {

      //asif deletion, set IsActive = false
      startDiagnosy.IsActive = false;

      this.doctorService.editDiagnosys(startDiagnosy).subscribe(response => {
        console.log(response);
        this.toastr.success('startDiagnosys has been deleted successfully', 'EMSv2024');
        this.doctorService.getAllDiagnosys();
      },
     
    (error) => {
      console.log(error)
      this.toastr.error('Something wrong! try again...', 'EMSv2024');
    });
  }
  else{
    startDiagnosy.IsActive = true;

      this.doctorService.editDiagnosys(startDiagnosy).subscribe(response => {
        console.log(response);
        this.toastr.success('startDiagnosys has been deleted successfully', 'EMSv2024');
        this.doctorService.getAllDiagnosys();
      },
     
    (error) => {
      console.log(error)
      this.toastr.error('Something wrong! try again...', 'EMSv2024');
    });
    
  }
}
  }
}
