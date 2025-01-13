import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { MedicineManagementsComponent } from './medicine-managements/medicine-managements.component';
import { ReceptionistsComponent } from './receptionists/receptionists.component';
import { PharmacistsComponent } from './pharmacists/pharmacists.component';

const routes: Routes = [
  {path:'auth',component:AuthComponent,
    loadChildren:() =>import('./auth/auth.module')
    .then(x => x.AuthModule)
  },

  { path: '', redirectTo: '/patients/list', pathMatch: 'full' },




  //Lazy Loading
  {path:'doctor',
    // component:DoctorComponent,
    loadChildren: () => import('./doctor/doctor.module')
      .then(e => e.DoctorModule)
  
  },



  {
    path: 'patients', component: ReceptionistsComponent,
    loadChildren: () => import('./receptionists/receptionists.module')
      .then(x => x.ReceptionistsModule),
  },
  {
    path: 'admin', component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(e => e.AdminModule)
  },

  {
    path: 'medicine-managements', component: MedicineManagementsComponent,
    loadChildren: () => import('./medicine-managements/medicine-managements.module')
      .then(e => e.MedicineManagementsModule)
  },

  {
    path: 'medicine-prescriptions', component: PharmacistsComponent,
    loadChildren: () => import('./pharmacists/pharmacists.module')
      .then(e => e.PharmacistsModule)
  },

  { path: '**', redirectTo: 'auth/notfound', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
