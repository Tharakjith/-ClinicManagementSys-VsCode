import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Prescription } from 'src/app/shared/model/prescription';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-add-medicine-list',
  templateUrl: './add-medicine-list.component.html',
  styleUrls: ['./add-medicine-list.component.scss']
})
export class AddMedicineListComponent implements OnInit {
  page: number = 1;
  pageSize: number = 6;
  searchTerm: string = "";
  

  constructor(public doctorService: DoctorService,
    private router:Router, private toastr: ToastrService
  ) { }
    //Lifecycle Hook
    ngOnInit(): void {
      console.log("Hai I am Medicine List Compnent !....");
      this.doctorService.getAllMedicine();
    }
      //search method
  //1. Filter Based on searchterm,
  filteredMedicine() {
    if (!this.searchTerm) {
      return this.doctorService.prescription;
    }
      //2. Return filteredEmployeesList
      const searchTermLower = this.searchTerm.toLowerCase();
      return this.doctorService.prescription.filter(e => {
        const empCode = `${e.PrescriptionId}`.toLocaleLowerCase();
        return (
  
          e.Dosage?.toLowerCase().includes(searchTermLower) ||
          empCode.includes(searchTermLower)
        );
  

      //e.prescriptionId?.includes(searchTermLower)

    });
  }
  editMedicine(prescription: Prescription): void {
    console.log(prescription);
    //Call Populate Employee
    //this.populateMedicineData(prescrption);
    this.router.navigate(['/doctor/edit/'+prescription.PrescriptionId]);
     
  }
  //Getting Employee
  /*populateMedicineData(prescription: Prescription) {
    console.log("Inside Populate method");
    console.log(prescription)
    //transform Date Format as YYYY-MM-DD
    //Using Date Pipe 
    var datePipe = new DatePipe("en-UK");
    let foemattedDate: any = datePipe.transform(prescription.DateOfJoining, 'yyyy-MM-dd');
    prescription.DateOfJoining = foemattedDate;
    this.doctorService.formMedicineData = { ...prescription };//spread operator ...

  }*/
    deleteMedicine(prescription:Prescription){
      //confirmation
    if(prescription.IsActive==true){
        
    if(confirm("Are you sure to DELETE this record?")) {

      //asif deletion, set IsActive = false
      prescription.IsActive = false;

      this.doctorService.editMedicine(prescription).subscribe(response => {
      console.log(response);
      this.toastr.success('Medicine has been deleted successfully', 'EMSv2024');
      this.doctorService.getAllMedicine();
    },
  
     (error) => {
     console.log(error)
     this.toastr.error('Something wrong! try again...', 'EMSv2024');
     });
    }
    else{
     prescription.IsActive = true;
  
     this.doctorService.editMedicine(prescription).subscribe(response => {
     console.log(response);
    this.toastr.success('Medicine has been deleted successfully', 'EMSv2024');
     this.doctorService.getAllMedicine();
    },
       
     
      (error) => {
         console.log(error)
         this.toastr.error('Something wrong! try again...', 'EMSv2024');
         });
        
        }
      }
    }
  }
   
    