import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctordashComponent } from './doctordash/doctordash.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { ReceptionistdashComponent } from './receptionistdash/receptionistdash.component';
import { PharmacistdashComponent } from './pharmacistdash/pharmacistdash.component';
import { LabtechniciandashComponent } from './labtechniciandash/labtechniciandash.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ {path:'login',component: LoginComponent},
  {path:'admin',component: AdmindashComponent,
    canActivate:[AuthGuard], data:{role:'1'}
  },
  {path:'doctor',component: DoctordashComponent,
    canActivate:[AuthGuard], data:{role:'2'}
  },
  {path:'receptionist',component: ReceptionistdashComponent,
    canActivate:[AuthGuard], data:{role:'3'}
  },
  {path:'pharmacist',component: PharmacistdashComponent,
    canActivate:[AuthGuard], data:{role:'4'}
  },
  {path:'labtechnician',component: LabtechniciandashComponent,
    canActivate:[AuthGuard], data:{role:'5'}
  },
  {path:'notfound',component: PagenotfoundComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
