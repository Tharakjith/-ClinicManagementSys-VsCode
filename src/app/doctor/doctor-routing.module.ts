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
import { LabtestviewreportListComponent } from './labtestviewreport-list/labtestviewreport-list.component';
import { LabtestaddListComponent } from './labtestadd-list/labtestadd-list.component';
import { LabtestaddEditComponent } from './labtestadd-edit/labtestadd-edit.component';
//import { AddMedicineAddComponent } from './add-medicine-add/add-medicine-add.component';
//import { AddMedicineListComponent } from './add-medicine-list/add-medicine-list.component';
//import { AddMedicineEditComponent } from './add-medicine-edit/add-medicine-edit.component';


const routes: Routes = [
  //employee List
  { path: 'list/:doctorId', component: ViewAppointmentListComponent},

  //Start Diagnosys
  {path:'add/:appId', component: StartDiagnosysAddComponent},

  
  {path:'edit/:id',component:StartDiagnosysEditComponent},
  

  {
    path: 'viewdigno/:appointmentId',component: StartDiagnosysListComponent
  },
  { path: 'viewreport/:appointmentId', component: LabtestviewreportListComponent },
//Medicine 
  {path:'medadd/:apId',component:AddMedicineAddComponent},

  {path:'edit/:id',component:AddMedicineEditComponent},
 {path:'list',component:AddMedicineListComponent},
//Labtest
{path:'labadd/:apId', component: LabtestaddAddComponent},  
 {path:'labedit',component:LabtestaddEditComponent},
  {path:'lablist',component:LabtestaddListComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }