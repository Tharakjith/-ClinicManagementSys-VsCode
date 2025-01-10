import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { AuthComponent } from './auth/auth.component';
import { ReceptionistsComponent } from './receptionists/receptionists.component';
import { PatientsListComponent } from './receptionists/patients-list/patients-list.component';

const routes: Routes = [

  // Empty Route
  {
    // path: '', redirectTo: 'auth/login', pathMatch: 'full'
    path: '', redirectTo: 'patients/list', pathMatch: 'full'
  }, 

  //Lazy Loading
  {
    path: 'doctor', component: DoctorComponent,
    loadChildren: () => import('./doctor/doctor.module')
      .then(e => e.DoctorModule)
  },

  //   {path:'auth',component:AuthComponent,
  //   loadChildren:() =>import('./auth/auth.module')
  //   .then(x => x.AuthModule)
  // },
  {
    path: 'patients', component: ReceptionistsComponent,
    loadChildren: () => import('./receptionists/receptionists.module')
      .then(x => x.ReceptionistsModule),
  },

  { path: '**', redirectTo: 'auth/notfound', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
