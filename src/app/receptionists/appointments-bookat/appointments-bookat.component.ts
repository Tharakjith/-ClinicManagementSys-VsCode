import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/shared/service/patient.service';

@Component({
  selector: 'app-appointments-bookat',
  templateUrl: './appointments-bookat.component.html',
  styleUrls: ['./appointments-bookat.component.scss']
})
export class AppointmentsBookatComponent implements OnInit {

   //declare variable
   errorMessage: string | null = null;

  constructor(public patientService: PatientService,
      private router: Router, 
      private toastr: ToastrService) { }

  ngOnInit(): void {
    this.patientService.getAllSpecializations();
  }

  //Submit Form
  onSubmit(patform: NgForm) {
    console.log(patform.value);

    //call Insert  Method
    this.bookappointment(patform);

    //Redirect to Employee List
    this.router.navigate(['/patients/list'])

    //Reset form
    patform.reset();

  }

  //Insert Method
  bookappointment(patform: NgForm) {
    console.log("inserting...")
    this.patientService.insertPatient(patform.value).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Record has been inserted successfully','EMS v2024')

        //Insert successful, clear error message
        this.errorMessage = null;

        //Refresh the list and navigate to the patient list page
        this.patientService.getAllPatients();

        //Redirect to patients List
        this.router.navigate(['/patients/list'])

        //Reset form
        patform.reset();
      },
      (error) => {
        console.log(error);
        this.toastr.error('An error occured !.. try again..', 'EMS v2024')
        this.errorMessage = 'An error occured' + error;
      }
    )
  };

}
