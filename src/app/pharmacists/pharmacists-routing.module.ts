import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineprescriptionListComponent } from './medicineprescription-list/medicineprescription-list.component';

const routes: Routes = [

  //employee-list
  {path:'list', component: MedicineprescriptionListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacistsRoutingModule { }
