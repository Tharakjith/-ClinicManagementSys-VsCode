import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabtestsRoutingModule } from './labtests-routing.module';
import { LabtestsComponent } from './labtests.component';
import { LabTestListComponent } from './lab-test-list/lab-test-list.component';
import { LabTestPreviewComponent } from './lab-test-preview/lab-test-preview.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { LabTestBillComponent } from './lab-test-bill/lab-test-bill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    LabtestsComponent,
    LabTestListComponent,
    LabTestPreviewComponent,
    GenerateReportComponent,
    LabTestBillComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LabtestsRoutingModule,
    NgxPaginationModule
  ]
})
export class LabtestsModule { }
