import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { LabTestBillComponent } from './lab-test-bill/lab-test-bill.component';
import { LabTestListComponent } from './lab-test-list/lab-test-list.component';
import { LabTestPreviewComponent } from './lab-test-preview/lab-test-preview.component';

const routes: Routes = [
  { path: 'labtests', component: LabTestListComponent },
  { path: 'generatereport/:TpId', component: GenerateReportComponent },
  { path: 'preview/:id', component: LabTestPreviewComponent },
  { path: 'bill/:id', component: LabTestBillComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabtestsRoutingModule { }
