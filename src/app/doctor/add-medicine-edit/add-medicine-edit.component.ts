import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-add-medicine-edit',
  templateUrl: './add-medicine-edit.component.html',
  styleUrls: ['./add-medicine-edit.component.scss']
})
export class AddMedicineEditComponent implements OnInit {

  errorMessage:string |null=null;
  constructor(public doctorService:DoctorService,
    private router:Router,
    private toastr: ToastrService
  ) { }


  //Submit form
  onSubmit(medicineform:NgForm){
    console.log(medicineform.value);
    //call insert method
    this.editMedicine(medicineform);
    

      //Redirect to Medicine list List
      this.router.navigate(['/doctor/list']);

      //Reset Form
     medicineform.reset();
  
    }
       //Insert Method
       editMedicine(medicineform:NgForm){
        console.log("Updating...");
        this.doctorService.editMedicine(medicineform.value).subscribe(
          (response)=>{
            console.log(response);
            this.toastr.success('Record has been Updated successfully','EMSv2024')
            this.errorMessage=null;
            this.doctorService.getAllMedicine();
    
            this.router.navigate(['/doctor/list']);
    
            medicineform.reset()
    
          },
          (error)=>{
            console.log(error);
            this.toastr.error('An error Occured','EMS v2024');
            this.errorMessage='An error Occured' + error;
          }
        );
      }

 
      ngOnInit(): void {
        this.doctorService.getAllMedicine();
      }
    }
    
