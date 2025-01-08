import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAppointmentListComponent } from './view-appointment-list/view-appointment-list.component';
import { StartDiagnosysAddComponent } from './start-diagnosys-add/start-diagnosys-add.component';


const routes: Routes = [
  //employee List
  { path: 'list/:doctorId', component: ViewAppointmentListComponent},

  //employee Add
  {path:'add', component: StartDiagnosysAddComponent}

  //employee Edit
  //{path:'edit/:id',component:EmployeeEditComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
