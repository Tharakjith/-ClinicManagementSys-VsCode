import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctormanagementListComponent } from './doctormanagement-list/doctormanagement-list.component';
import { DoctormanagementAddComponent } from './doctormanagement-add/doctormanagement-add.component';
import { DoctormanagementEditComponent } from './doctormanagement-edit/doctormanagement-edit.component';

const routes: Routes = [{ path: 'list', component: DoctormanagementListComponent },
   { path: 'add', component: DoctormanagementAddComponent },
  { path: 'edit/:id', component: DoctormanagementEditComponent },
 ];

 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class DoctormanagementRoutingModule { }
