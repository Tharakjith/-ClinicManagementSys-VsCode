import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Labtestreport } from 'src/app/shared/model/labtestreport';
import { Todaylabtest } from 'src/app/shared/model/todaylabtest';
import { LabTestServiceService } from 'src/app/shared/service/lab-test-service.service';

@Component({
  selector: 'app-lab-test-list',
  templateUrl: './lab-test-list.component.html',
  styleUrls: ['./lab-test-list.component.scss']
})
export class LabTestListComponent implements OnInit {
  labTests: Todaylabtest[] = [];
  filteredTests: Todaylabtest[] = [];
  page = 1;
  pageSize = 10;
  searchTerm = '';
  
    constructor(
      private labTestService: LabTestServiceService,
      private router: Router,
      private toastr: ToastrService
    ) { }
  
    ngOnInit(): void {
      this.loadTests();
    }
  
    loadTests(): void {
      this.labTestService.getTodaysPrescribedTests().subscribe({
        next: (tests) => {
          this.labTests = tests;
          this.filterTests();
        },
        error: () => this.toastr.error('Failed to load tests')
      });
    }
  
    filterTests(): void {
      const term = this.searchTerm.toLowerCase();
      this.filteredTests = this.labTests.filter(test =>
        test.TpId.toString().includes(term) ||
        test.PatientName.toLowerCase().includes(term) ||
        test.StaffName.toLowerCase().includes(term)
      );
      if (this.filteredTests.length === 0 && this.searchTerm) {
        this.toastr.warning('Oops! Search not found');
      }
    }
    
    onSearchChange(): void {
      this.page = 1;
      this.filterTests();
    }
    
    onGenerateReport(test: Todaylabtest): void {
      console.log(test);
      this.router.navigate(['/labtests/generatereport', test.TpId]);
    }
  }