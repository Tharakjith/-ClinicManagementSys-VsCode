import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from 'src/app/shared/service/staff.service';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss'],
})
export class StaffAddComponent implements OnInit {
  errorMessage: string | null = null;
  minDate: string;
  maxDate: string;
  today: string;

  constructor(
    public staffService: StaffService,
    private router: Router,
    private toastr: ToastrService
  ) {
    // Setting the minimum and maximum dates for DoB
    this.maxDate = this.formatDate(new Date(2002, 11, 31)); // Max Date: Dec 31, 2002
    this.minDate = this.formatDate(new Date(1970, 0, 1)); // Min Date: Jan 1, 1970
    this.today = this.formatDate(new Date());
  }

  ngOnInit(): void {
    // Fetch department list
    this.staffService.getAllDepartments();

    // Autofill Doj and CreatedDate with today's date
    this.staffService.formStaffData.Doj = new Date(); // Assigning current date object
    this.staffService.formStaffData.CreatedDate = new Date(); // Assigning current date object
  }

  // Helper method to format date in 'YYYY-MM-DD' format
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Capitalize the first letter of the staff name
  capitalizeFirstLetter(value: string): void {
    if (value) {
      this.staffService.formStaffData.StaffName =
        value.charAt(0).toUpperCase() + value.slice(1);
    }
  }

  // Submit form
  onSubmit(stForm: NgForm): void {
    if (stForm.valid) {
      this.addStaff(stForm);
    } else {
      this.toastr.warning(
        'Please fill all required fields correctly',
        'CMS v2025'
      );
      this.validateAllFormFields(stForm);
    }
  }

  // Mark all form fields as touched for validation display
  private validateAllFormFields(form: NgForm): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.controls[field];
      control.markAsTouched();
    });
  }

  // Add staff member
  addStaff(stForm: NgForm): void {
    // Ensure that Doj and CreatedDate are not in the future
    const currentDate = new Date();
    if (stForm.value.Doj > currentDate) {
      this.toastr.warning('Date of Joining cannot be in the future', 'CMS v2025');
      return;
    }

    stForm.value.CreatedDate = currentDate; // Ensure CreatedDate is set to the current date
    stForm.value.RegisteredDate = currentDate; // Optional, remove if not needed

    this.staffService.insertStaffs(stForm.value).subscribe(
      () => {
        this.toastr.success('Staff member added successfully', 'CMS v2025');
        this.errorMessage = null;
        this.staffService.getAllStaffs(); // Refresh staff list
        this.router.navigate(['/admin/list']); // Redirect to staff list
      },
      (error) => {
        console.error('Error adding staff:', error);
        this.toastr.error('Failed to add staff member', 'CMS v2025');
        this.errorMessage = `An error occurred: ${error.message}`;
      }
    );
  }
}
