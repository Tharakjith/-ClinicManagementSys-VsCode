import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/shared/model/appointment';
import { Medicinedetails } from 'src/app/shared/model/medicinedetails';
import { StartDiagnosy } from 'src/app/shared/model/start-diagnosy';
import { DoctorService } from 'src/app/shared/service/doctor.service';

@Component({
  selector: 'app-add-medicine-add',
  templateUrl: './add-medicine-add.component.html',
  styleUrls: ['./add-medicine-add.component.scss']
})
export class AddMedicineAddComponent implements OnInit {
  //declare error message
   //declare error message
   appointment:Appointment=new Appointment();
   startDiagnosy:StartDiagnosy=new StartDiagnosy();
   errorMessage:string |null=null;
   AppointmentId : number = 0;
   
   
  
  constructor(public doctorService:DoctorService,
    private router:Router,
    private toastr: ToastrService,
    private route:ActivatedRoute  ) { }

  ngOnInit(): void {
       // Retrieve Patient ID from route
       this.route.paramMap.subscribe((params) => {
        this.AppointmentId = Number(params.get('appId'));
        this.startDiagnosy.AppointmentId = this.AppointmentId;
      });     
      console.log(this.AppointmentId);
  
      console.log(this.AppointmentId);
   
   

    this.doctorService.getAllMedicine();

  }
  //Submit form
  onSubmit(medicineform:NgForm){
    console.log(medicineform.value);
    //call insert method
    this.addMedicine(medicineform);
    //Reset Form
    medicineform.reset();

    //Redirect to Employee List
    this.router.navigate(['/doctor/list']);

  }  //Insert Method
  addMedicine(medicineform:NgForm){
    console.log("inserting...");
    this.doctorService.insertMedicine(medicineform.value).subscribe(
      (response)=>{
        console.log(response);
        this.toastr.success('Record has been inserted successfully','EMSv2024')
        this.errorMessage=null;
        this.doctorService.getAllMedicine();

        this.router.navigate(['/doctor/list']);

        medicineform.reset()

      },
      (error)=>{
        console.log(error);
        this.toastr.error('An error Occured','EMSv2024')
        this.errorMessage='An error Occured' + error;
      }
         
    );
  }

}

