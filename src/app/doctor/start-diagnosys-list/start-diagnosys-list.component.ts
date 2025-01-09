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
      return this.doctorService.startDiagnosys;
    }
    //2. Return filteredEmployeesList
    const searchTermLower = this.searchTerm.toLowerCase();

    return this.doctorService.startDiagnosys.filter(e => {
      const empCode = `EC${e.HistoryId}`.toLocaleLowerCase();
      return (
        e.Diagnosis?.toLowerCase().includes(searchTermLower) ||
        empCode.includes(searchTermLower)
      );


      //e.EmployeeId?.includes(searchTermLower)

    });
  }

  editDiagnosys(startDiagnosys: StartDiagnosy): void {
    console.log(startDiagnosys);
    //Call Populate Employee
    this.populateDiagnosysData(startDiagnosys);
    this.router.navigate(['/startDiagnosys/edit/'+startDiagnosys.HistoryId]);
   

  }
  //Getting Employee
  populateDiagnosysData(startDiagnosys: StartDiagnosy) {
    console.log("Inside Populate method");
    console.log(startDiagnosys)
    //transform Date Format as YYYY-MM-DD
    //Using Date Pipe 
    var datePipe = new DatePipe("en-UK");
    let foemattedDate: any = datePipe.transform(startDiagnosys.DiagnosysDate, 'yyyy-MM-dd');
    startDiagnosys.DiagnosysDate = foemattedDate;
    this.doctorService.formDiagnosysData = { ...startDiagnosys };//spread operator ...

  }
  deleteDiagnosys(startDiagnosys: StartDiagnosy){
    //confirmation
    if(startDiagnosys.IsActive==true){


    if(confirm("Are you sure to DELETE this record?")) {

      //asif deletion, set IsActive = false
      startDiagnosys.IsActive = false;

      this.doctorService.editDiagnosys(startDiagnosys).subscribe(response => {
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
    startDiagnosys.IsActive = true;

      this.doctorService.editDiagnosys(startDiagnosys).subscribe(response => {
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
