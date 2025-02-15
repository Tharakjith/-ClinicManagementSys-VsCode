import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabtechniciansRoutingModule } from './labtechnicians-routing.module';
import { LabtechniciansComponent } from './labtechnicians.component';
import { LabtestlistListComponent } from './labtestlist-list/labtestlist-list.component';
import { LabtestreportUpdateComponent } from './labtestreport-update/labtestreport-update.component';
import { LabtestbillListComponent } from './labtestbill-list/labtestbill-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LabtechniciansComponent,
    LabtestlistListComponent,
    LabtestreportUpdateComponent,
    LabtestbillListComponent,
  ],
  imports: [
    CommonModule,
    LabtechniciansRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule ,
    SharedModule
  ]
})
export class LabtechniciansModule { }
