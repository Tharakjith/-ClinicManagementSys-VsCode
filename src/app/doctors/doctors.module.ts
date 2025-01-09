import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
//import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DoctorsComponent,
    //DoctorListComponent,
    DoctorAddComponent,
    DoctorEditComponent
  ],
  imports: [
    CommonModule,
       DoctorsRoutingModule,
       NgxPaginationModule,
       Ng2SearchPipeModule,
       FormsModule  
  ]
})
export class DoctorsModule { }
