// medicinedistribute-add.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MedicinedistributeService } from 'src/app/shared/service/medicinedistribute.service';

@Component({
  selector: 'app-medicinedistribute-add',
  templateUrl: './medicinedistribute-add.component.html',
  styleUrls: ['./medicinedistribute-add.component.scss']
})
export class MedicinedistributeAddComponent implements OnInit {
  distributionDate: string = new Date().toISOString().split('T')[0];
  submitted: boolean = false;

  constructor(
    public medicinedistributeService: MedicinedistributeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(mdaForm: NgForm) {
    if (mdaForm.invalid) {
      this.toastr.warning('Please fill all required fields', 'Validation');
      return;
    }
  
    const quantityDistributed = this.medicinedistributeService.formMedicinedistributeData.QuantityDistributed;
    const stockInHand = this.medicinedistributeService.formMedicinedistributeData.StockInHand;
  
    if (quantityDistributed < 1) {
      this.toastr.warning('Quantity must be at least 1', 'Validation');
      return;
    }
  
    if (quantityDistributed > stockInHand) {
      this.toastr.warning(`Quantity cannot exceed stock in hand (${stockInHand})`, 'Validation');
      return;
    }
  
    this.submitted = true;
    const distributionData = {
      PrescriptionId: this.medicinedistributeService.formMedicinedistributeData.PrescriptionId,
      MedicineId: this.medicinedistributeService.formMedicinedistributeData.MedicineId,
      QuantityDistributed: quantityDistributed,
      DistributionDate: this.distributionDate,
      MedStatusId: 1
    };
  
    this.medicinedistributeService.insertMedicineDistribute(distributionData).subscribe({
      next: (response) => {
        this.toastr.success('Medicine distributed successfully', 'Success');
        this.router.navigate(['/medicine-prescriptions/Medicinebilllist', distributionData.PrescriptionId]);
      },
      error: (error) => {
        this.toastr.error('Failed to distribute medicine', 'Error');
        console.error('Error submitting distribution:', error);
        this.submitted = false;
      }
    });
  }
  

  navigateToBill() {
    const prescriptionId = this.medicinedistributeService.formMedicinedistributeData.PrescriptionId;
    if (prescriptionId && this.submitted) {
      this.router.navigate(['/medicine-prescriptions/Medicinebilllist', prescriptionId]);
    } else {
      this.toastr.warning('Please submit the distribution form first', 'Warning');
    }
  }
}