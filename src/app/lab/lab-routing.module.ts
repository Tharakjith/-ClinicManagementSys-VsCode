import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabListComponent } from './lab-list/lab-list.component';
import { LabAddComponent } from './lab-add/lab-add.component';
import { LabEditComponent } from './lab-edit/lab-edit.component';

const routes: Routes = [{ path: 'list', component: LabListComponent },
  { path: 'add', component: LabAddComponent },
  { path: 'edit/:id', component: LabEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
