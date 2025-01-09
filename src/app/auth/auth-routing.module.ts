import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { DoctordashComponent } from './doctordash/doctordash.component';
import { ReceptionistdashComponent } from './receptionistdash/receptionistdash.component';

const routes: Routes = [
  { path: 'login',component: LoginComponent},
  {path:'doctor',component:DoctordashComponent},
  {path: 'receptionist', component: ReceptionistdashComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
