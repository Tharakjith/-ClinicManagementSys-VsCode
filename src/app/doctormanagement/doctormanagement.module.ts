import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctormanagementRoutingModule } from './doctormanagement-routing.module';
import { DoctormanagementComponent } from './doctormanagement.component';
import { DoctormanagementListComponent } from './doctormanagement-list/doctormanagement-list.component';
import { DoctormanagementEditComponent } from './doctormanagement-edit/doctormanagement-edit.component';
import { DoctormanagementAddComponent } from './doctormanagement-add/doctormanagement-add.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DoctormanagementComponent,
    DoctormanagementListComponent,
    DoctormanagementEditComponent,
    DoctormanagementAddComponent
  ],
  imports: [
    CommonModule,
    DoctormanagementRoutingModule,
     NgxPaginationModule,
        Ng2SearchPipeModule,
        FormsModule  
  ]
})
export class DoctormanagementModule { }
