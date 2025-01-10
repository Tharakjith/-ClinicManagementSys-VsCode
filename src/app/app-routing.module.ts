import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { LabComponent } from './lab/lab.component';
import { RegisterComponent } from './register/register.component';
import { DoctordashComponent } from './auth/doctordash/doctordash.component';
import { DoctormanagementComponent } from './doctormanagement/doctormanagement.component';



const routes: Routes = [
//Empty Routes
{
  path: '', redirectTo: 'auth/login', pathMatch: 'full'
},
  //Lazy-loading
  {path : 'auth', component: AuthComponent,
    loadChildren: () => import ('./auth/auth.module')
    .then(x => x.AuthModule)
  },
  { 
    path: 'admin',  component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(e => e.AdminModule) 
  }, 
  { 
    path: 'lab',  component: LabComponent,
    loadChildren: () => import('./lab/lab.module').then(e => e.LabModule) 
  },
  { 
    path: 'register',  component: RegisterComponent,
    loadChildren: () => import('./register/register.module').then(e => e.RegisterModule) 
  },
  { 
    path: 'doctormanagement',  component: DoctormanagementComponent,
    loadChildren: () => import('./doctormanagement/doctormanagement.module').then(e => e.DoctormanagementModule) 
  },
  //Wildcard routes
  {path: '**', redirectTo: 'auth/notfound', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
