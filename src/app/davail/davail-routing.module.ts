import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DavailAddComponent } from './davail-add/davail-add.component';

const routes: Routes = [
  //employee-add
  { path: 'add/:doctorId', component: DavailAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DavailRoutingModule { }