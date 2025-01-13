import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { DoctordashComponent } from './doctordash/doctordash.component';
import { ReceptionistsComponent } from '../receptionists/receptionists.component';
import { ReceptionistdashComponent } from './receptionistdash/receptionistdash.component';
import { PatientsListComponent } from '../receptionists/patients-list/patients-list.component';

const routes: Routes = [
  { path: 'login',component: LoginComponent},
  {path:'admin',component:AdmindashComponent},
  {path:'doctor',component:DoctordashComponent},
  {path: 'receptionist', component: PatientsListComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
