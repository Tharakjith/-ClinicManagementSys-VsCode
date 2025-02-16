import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LabtestService } from 'src/app/shared/service/labtest.service';

@Component({
  selector: 'app-lab-add',
  templateUrl: './lab-add.component.html',
  styleUrls: ['./lab-add.component.scss']
})
export class LabAddComponent implements OnInit {
  errorMessage: string | null = null;
  
  constructor(
    public labService: LabtestService,
    private router: Router, 
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.labService.formlabData.CreatedDate = currentDate;
    this.labService.formlabData.IsActive = true;
  }

  // Validation methods
  validateTestName(testName: string): boolean {
    const testNameRegex = /^[A-Z][a-zA-Z]{2,24}$/;
    return testNameRegex.test(testName);
  }

  validatePrice(price: number): boolean {
    return price >= 50 && price <= 1000 && price >= 0;
  }

  validateLowRange(lowRange: number): boolean {
    return lowRange >= 10 && lowRange >= 0;
  }

  validateHighRange(lowRange: number, highRange: number): boolean {
    return highRange > lowRange && highRange <= 350;
  }

  // Submit form
  onSubmit(stForm: NgForm) {
    // Validate Test Name
    if (!this.validateTestName(stForm.value.TestName)) {
      this.toastr.error('Test Name must start with capital letter, 3-25 characters, no spaces or numbers', 'Validation Error');
      return;
    }

    // Validate Price
    const price = parseFloat(stForm.value.Price);
    if (!this.validatePrice(price)) {
      this.toastr.error('Price must be between 50 and 1000', 'Validation Error');
      return;
    }

    // Validate Low Range
    const lowRange = parseFloat(stForm.value.LowRange);
    if (!this.validateLowRange(lowRange)) {
      this.toastr.error('Low Range must be at least 10', 'Validation Error');
      return;
    }

    // Validate High Range
    const highRange = parseFloat(stForm.value.HighRange);
    if (!this.validateHighRange(lowRange, highRange)) {
      this.toastr.error('High Range must be higher than Low Range and max 350', 'Validation Error');
      return;
    }

    // Set default values
    stForm.value.CreatedDate = new Date().toISOString().split('T')[0];
    stForm.value.IsActive = true;

    // Add staff
    this.addStaff(stForm);
  }

  // Insert method
  addStaff(stForm: NgForm) {
    this.labService.inserttests(stForm.value).subscribe(
      (response) => {
        this.toastr.success('Record successfully inserted', 'CMS v2025');
        this.errorMessage = null;
        this.labService.getAlltests();
        this.router.navigate(['/lab/list']);
        stForm.reset();
      },
      (error) => {
        this.toastr.error('An error occurred', 'CMS v2025');
        this.errorMessage = 'An error occurred: ' + error;
      }
    );
  }
}