import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DmanagementService } from 'src/app/shared/service/dmanagement.service';

@Component({
  selector: 'app-doctormgmt-edit',
  templateUrl: './doctormgmt-edit.component.html',
  styleUrls: ['./doctormgmt-edit.component.scss']
})
export class DoctormgmtEditComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(
    public doctormanagementService: DmanagementService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Load all required data
    this.doctormanagementService.getAlldoctors();
    this.doctormanagementService.getAllSpecilization();
    this.doctormanagementService.getAllstaff();
    this.doctormanagementService.getAllusers();
  }

  onSubmit(stForm: NgForm) {
    if (stForm.valid) {
      this.updateDoctor(stForm);
    } else {
      this.toastr.warning('Please fill all required fields', 'CMS v2024');
    }
  }

  updateDoctor(stForm: NgForm) {
    this.doctormanagementService.Updateusers(stForm.value).subscribe(
      (response) => {
        this.toastr.success('Doctor updated successfully', 'CMS v2024');
        this.errorMessage = null;
        this.doctormanagementService.getAlldoctors();
        this.router.navigate(['/doctormgmt/list']);
      },
      (error) => {
        console.error('Error updating doctor:', error);
        this.toastr.error('Error updating doctor', 'CMS v2024');
        this.errorMessage = 'Error updating doctor: ' + error.message;
      }
    );
  }
}