import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestPrescription } from 'src/app/shared/model/test-prescription';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-labtestadd-list',
  templateUrl: './labtestadd-list.component.html',
  styleUrls: ['./labtestadd-list.component.scss']
})
export class LabtestaddListComponent implements OnInit {
  page: number = 1;
  pageSize: number = 6;
  searchTerm: string = "";
  testPrescription:TestPrescription=new TestPrescription();


  constructor(public doctorService: DoctorService,
    private router:Router, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log("Hai I am Employee List Compnent !....");
    this.doctorService.getAllTest();
  }
  

   //search method
   //1. Filter Based on searchterm, employee service.employees should populate
   filteredLabtest() {
     if (!this.searchTerm) {
       return this.doctorService.testPrescription;
     }
     //2. Return filteredEmployeesList
     const searchTermLower = this.searchTerm.toLowerCase();
 
     return this.doctorService.testPrescription.filter(e => {
       const labCode = `${e.LabTestId}`.toLocaleLowerCase();
       return (
         e.SampleItem?.toLowerCase().includes(searchTermLower) ||
         labCode.includes(searchTermLower)
       );
 
 
       //e.EmployeeId?.includes(searchTermLower)
 
     });
   }
 
   editLabtest(testPrescription: TestPrescription): void {
     console.log(testPrescription);
     //Call Populate Employee
     this.populateLabtestData(testPrescription);
     this.router.navigate(['/labtestadd/edit/'+testPrescription.LabTestId]);
    
 
   }
   //Getting Employee
  
   populateLabtestData(testPrescription: TestPrescription) {
     console.log("Inside Populate method");
     console.log(testPrescription)
     //transform Date Format as YYYY-MM-DD
     //Using Date Pipe 
     var datePipe = new DatePipe("en-UK");
     //let foemattedDate: any = datePipe.transform(testPrescription.DiagnosysDate, 'yyyy-MM-dd');
    // testPrescription.LabTestId = foemattedDate;
     this.doctorService.formLabtestData = { ...testPrescription };
  
   } 
   
    deleteLabtest(testPrescription:TestPrescription){
         //confirmation
       if(testPrescription.IsActive==true){
           
       if(confirm("Are you sure to DELETE this record?")) {
   
         //asif deletion, set IsActive = false
         testPrescription.IsActive = false;
   
         this.doctorService.editTest(testPrescription).subscribe(response => {
         console.log(response);
         this.toastr.success('Medicine has been deleted successfully', 'EMSv2024');
         this.doctorService.getAllLabtest();
       },
     
        (error) => {
        console.log(error)
        this.toastr.error('Something wrong! try again...', 'EMSv2024');
        });
       }
       else{
      testPrescription.IsActive = true;
     
        this.doctorService.editTest(testPrescription).subscribe(response => {
        console.log(response);
       this.toastr.success('Medicine has been deleted successfully', 'EMSv2024');
        this.doctorService.getAllLabtest();
       },
          
        
         (error) => {
            console.log(error)
            this.toastr.error('Something wrong! try again...', 'EMSv2024');
            });
    }  
 }
}
}
 