import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Todaylabtest } from 'src/app/shared/model/todaylabtest';
import { LabtestreportService } from 'src/app/shared/service/labtestreport.service';
import { LabTestService } from 'src/app/shared/service/todaylabtest.service';

@Component({
    selector: 'app-labtestlist-list',
    templateUrl: './labtestlist-list.component.html',
    styleUrls: ['./labtestlist-list.component.scss']
})
export class LabtestlistListComponent implements OnInit {
    labTests: Todaylabtest[] = [];
    page: number = 1;
    pageSize: number = 10;
    searchTerm: string = '';
    loading: boolean = false;

    constructor(
        private labTestService: LabTestService,
        private labtestReport: LabtestreportService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.loadTodaysLabTests();
    }

    loadTodaysLabTests(): void {
        this.loading = true;
        this.labTestService.getTodaysPrescribedTests().subscribe({
            next: (tests) => {
                this.labTests = tests;
                this.loading = false;
            },
            error: (error) => {
                this.toastr.error('Failed to load lab tests');
                this.loading = false;
            }
        });
    }

    onPageChange(page: number): void {
        this.page = page;
    }

    filteredLabTests(): Todaylabtest[] {
        if (!this.searchTerm) {
            return this.labTests;
        }
        const searchTermLower = this.searchTerm.toLowerCase();
        return this.labTests.filter(test =>
            test.PatientName.toLowerCase().includes(searchTermLower) ||
            test.TestName.toLowerCase().includes(searchTermLower)
        );
    }

    generateLabReport(testId: number): void {
        this.labtestReport.getLabTestReportById(testId).subscribe({
            next: () => {
                this.toastr.success('Lab report generated successfully');
            },
            error: (error) => {
                this.toastr.error('Failed to generate lab report');
            }
        });
    }
}