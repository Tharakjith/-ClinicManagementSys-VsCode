import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LabtestreportService } from 'src/app/shared/service/labtestreport.service';


@Component({
  selector: 'app-labtestreport-update',
  templateUrl: './labtestreport-update.component.html',
  styleUrls: ['./labtestreport-update.component.scss']
})
export class LabtestreportUpdateComponent implements OnInit {
    reportForm: FormGroup;
    reportId: number = 0;
    loading = false;
    submitting = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private labTestService: LabtestreportService,
        private toastr: ToastrService
    ) {
        this.reportForm = this.fb.group({
            tpId: [''],
            appointmentId: [''],
            patientId: [''],
            labTestId: [''],
            testName: [''],
            highRange: ['', Validators.required],
            lowRange: ['', Validators.required],
            actualResult: ['', [Validators.required, Validators.min(0)]],
            remarks: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.reportId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadReport();
    }

    loadReport(): void {
        this.loading = true;
        this.labTestService.getLabTestReportById(this.reportId).subscribe({
            next: (report) => {
                this.reportForm.patchValue(report);
                this.loading = false;
            },
            error: (error) => {
                this.toastr.error('Failed to load report details');
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.reportForm.invalid) {
            return;
        }

        this.submitting = true;
        const formData = this.reportForm.value;

        this.labTestService.updateLabTestReport(this.reportId, formData).subscribe({
            next: () => {
                this.toastr.success('Report updated successfully');
                this.submitting = false;
            },
            error: (error) => {
                this.toastr.error('Failed to update report');
                this.submitting = false;
            }
        });
    }

    generateBill(): void {
        this.labTestService.generateBill(this.reportId).subscribe({
            next: () => {
                this.toastr.success('Bill generated successfully');
                // Navigate to bill view or download
            },
            error: (error) => {
                this.toastr.error('Failed to generate bill');
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/labtest-list']);
    }
}
