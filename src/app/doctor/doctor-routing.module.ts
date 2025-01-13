import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAppointmentListComponent } from './view-appointment-list/view-appointment-list.component';
import { StartDiagnosysAddComponent } from './start-diagnosys-add/start-diagnosys-add.component';
import { StartDiagnosysEditComponent } from './start-diagnosys-edit/start-diagnosys-edit.component';
import { StartDiagnosysListComponent } from './start-diagnosys-list/start-diagnosys-list.component';
import { AddMedicineAddComponent } from './add-medicine-add/add-medicine-add.component';
import { AddMedicineEditComponent } from './add-medicine-edit/add-medicine-edit.component';
import { AddMedicineListComponent } from './add-medicine-list/add-medicine-list.component';
import { LabtestaddAddComponent } from './labtestadd-add/labtestadd-add.component';
//import { AddMedicineAddComponent } from './add-medicine-add/add-medicine-add.component';
//import { AddMedicineListComponent } from './add-medicine-list/add-medicine-list.component';
//import { AddMedicineEditComponent } from './add-medicine-edit/add-medicine-edit.component';


const routes: Routes = [
  //employee List
  { path: 'list/:doctorId', component: ViewAppointmentListComponent},

  //Start Diagnosys
  {path:'add/:appId', component: StartDiagnosysAddComponent},

  
  {path:'edit/:id',component:StartDiagnosysEditComponent},
  
  {path:'diagnosis/list',component:StartDiagnosysListComponent},

  
//Medicine 
  {path:'medadd/:appId',component:AddMedicineAddComponent},

  {path:'edit/:id',component:AddMedicineEditComponent},
 {path:'list',component:AddMedicineListComponent},
//Labtest
  {path:'labadd',component:LabtestaddAddComponent},
  {path:'labedit',component:LabtestaddAddComponent},
  {path:'lablist',component:LabtestaddAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
