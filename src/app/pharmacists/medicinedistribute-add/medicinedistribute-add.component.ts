import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MedicinedistributeService } from 'src/app/shared/service/medicinedistribute.service';
import { MedicinepresciptionService } from 'src/app/shared/service/medicinepresciption.service';

@Component({
  selector: 'app-medicinedistribute-add',
  templateUrl: './medicinedistribute-add.component.html',
  styleUrls: ['./medicinedistribute-add.component.scss']
})
export class MedicinedistributeAddComponent implements OnInit {

  //declare variables
  errorMessage: string | null = null;
  distributionDate = new Date().toISOString().slice(0, 10); // Set to today's date
  prescriptionId: number | null = null;

  constructor(
    public medicinedistributeService:MedicinedistributeService,
    private route: ActivatedRoute,
    private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.prescriptionId = +params['pid'];
      if (this.prescriptionId) {
        this.getPrescriptionDetails(this.prescriptionId);
      }
    });
  }

  getPrescriptionDetails(prescriptionId: number): void {
    this.medicinedistributeService.getPrescriptionDetails(prescriptionId).subscribe(
      (response) => {
        this.medicinedistributeService.formMedicinedistributeData = response;
      },
      (error) => {
        this.toastr.error('Failed to fetch prescription details', 'Error');
        console.error(error);
      }
    );
  }

onSubmit(mdaForm: NgForm){
  console.log(mdaForm.value);

  //Call Insert Method
 this.addMedicineDistribute(mdaForm);

  //Reset Form
  mdaForm.reset();


}

//Insert Method
addMedicineDistribute(mdaForm: NgForm){
console.log("inserting...");
this.medicinedistributeService.insertMedicineDistribute(mdaForm.value).subscribe(
  (response)=>{
    console.log(response);
    this.toastr.success('Record has been inserted successfully','EMS v2024');

    //insert successfull ,clear error message
    this.errorMessage = null;

    //refresh the list anf navigate to the employee list page
    this.medicinedistributeService.getAllMedicineDistribute();

    //Redirect to medicine distribute List
    this.router.navigate(['/pharmacists/Medicineprescriptionlist']);
    //Reset Form
    mdaForm.reset();

  },
  (error)=>{
    console.log(error);
    this.toastr.error('An error occurred ','EMS v2024');
    this.errorMessage ='An error occured!' + error;
  }
);
}

}
