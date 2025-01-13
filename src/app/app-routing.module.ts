import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { MedicineManagementsComponent } from './medicine-managements/medicine-managements.component';
import { PatientsListComponent } from './receptionists/patients-list/patients-list.component';
import { ReceptionistsComponent } from './receptionists/receptionists.component';
import { PharmacistsComponent } from './pharmacists/pharmacists.component';

const routes: Routes = [

<<<<<<< HEAD
  // Empty Route
   {
     path: '', redirectTo: 'auth/login', pathMatch: 'full'
    
  },

  //Lazy Loading
  {path:'doctor',
    // component:DoctorComponent,
=======
  { path: '', redirectTo: '/admin/list', pathMatch: 'full' },
  
  {
    path: 'doctor', component: DoctorComponent,
>>>>>>> d0fdefa26a72c0830a362f9717447626f7d53d96
    loadChildren: () => import('./doctor/doctor.module')
      .then(e => e.DoctorModule)

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
