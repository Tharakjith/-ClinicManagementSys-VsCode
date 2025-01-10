import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacistsRoutingModule } from './pharmacists-routing.module';
import { PharmacistsComponent } from './pharmacists.component';
import { MedicineprescriptionListComponent } from './medicineprescription-list/medicineprescription-list.component';
import { MedicinedistributeListComponent } from './medicinedistribute-list/medicinedistribute-list.component';
import { MedicinedistributeEditComponent } from './medicinedistribute-edit/medicinedistribute-edit.component';
import { MedicinebillListComponent } from './medicinebill-list/medicinebill-list.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    PharmacistsComponent,
    MedicineprescriptionListComponent,
    MedicinedistributeListComponent,
    MedicinedistributeEditComponent,
    MedicinebillListComponent
  ],
  imports: [
    CommonModule,
    PharmacistsRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class PharmacistsModule { }
