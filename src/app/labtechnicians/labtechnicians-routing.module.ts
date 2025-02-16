import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabtestbillListComponent } from './labtestbill-list/labtestbill-list.component';
import { LabtestreportUpdateComponent } from './labtestreport-update/labtestreport-update.component';
import { LabtestlistListComponent } from './labtestlist-list/labtestlist-list.component';


const routes: Routes = [

  {path : 'Labtestlist', component: LabtestlistListComponent},
  {path : 'Labtestreport', component: LabtestreportUpdateComponent},
  {path : 'Labtestbill', component: LabtestbillListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabtechniciansRoutingModule { }
