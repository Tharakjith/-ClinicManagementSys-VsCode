import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { DoctordashComponent } from './doctordash/doctordash.component';
import { PatientsListComponent } from '../receptionists/patients-list/patients-list.component';
import { PharmacistdashComponent } from './pharmacistdash/pharmacistdash.component';
import { AuthGuard } from './auth.guard';
import { ViewAppointmentListComponent } from '../doctor/view-appointment-list/view-appointment-list.component';
import { LabtestlistListComponent } from '../labtechnicians/labtestlist-list/labtestlist-list.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'login',component: LoginComponent},
  {path:'admin',component:AdmindashComponent,
    canActivate:[AuthGuard], data:{role:'1'}
  },
  {path:'doctor',component:ViewAppointmentListComponent,
    canActivate:[AuthGuard], data:{role:'2'}
  },
  {path: 'receptionist', component: PatientsListComponent,
    canActivate:[AuthGuard], data:{role:'3'}
  },
  {path: 'pharmacist', component: PharmacistdashComponent,
    canActivate:[AuthGuard], data:{role:'4'}
  } ,
  {path: 'labtechnician', component: LabtestlistListComponent,
    canActivate:[AuthGuard], data:{role:'5'}
  } ,
  {path:'notfound',component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
