import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacistsRoutingModule } from './pharmacists-routing.module';
import { PharmacistsComponent } from './pharmacists.component';
import { MedicineprescriptionListComponent } from './medicineprescription-list/medicineprescription-list.component';
import { MedicinebillListComponent } from './medicinebill-list/medicinebill-list.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MedicinedistributeAddComponent } from './medicinedistribute-add/medicinedistribute-add.component';
import { NavbarComponent } from '../auth/navbar/navbar.component';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PharmacistsComponent,
    MedicineprescriptionListComponent,
    MedicinedistributeAddComponent,
    MedicinebillListComponent,
    MedicinedistributeAddComponent,
  ],
  imports: [
    CommonModule,
    PharmacistsRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    SharedModule
  ]
})
export class PharmacistsModule { }
