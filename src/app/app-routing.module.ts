import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { MedicineManagementsComponent } from './medicine-managements/medicine-managements.component';
import { PatientsListComponent } from './receptionists/patients-list/patients-list.component';
import { ReceptionistsComponent } from './receptionists/receptionists.component';
import { PharmacistsComponent } from './pharmacists/pharmacists.component';
import { LabComponent } from './lab/lab.component';
import { DoctormgmtComponent } from './doctormgmt/doctormgmt.component';
//import { LabtestlistListComponent } from './labtechnicians/labtestlist-list/labtestlist-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  //Lazy Loading
  {
    path: 'doctor', component: DoctorComponent,
    loadChildren: () => import('./doctor/doctor.module')
      .then(e => e.DoctorModule)
  },
  {
    path: 'uregistration',
    loadChildren: () => import('./uregistration/uregistration.module')
      .then(e => e.UregistrationModule)
  },

  {
    path: 'doctormgmt', component: DoctormgmtComponent,
    loadChildren: () => import('./doctormgmt/doctormgmt.module')
      .then(x => x.DoctormgmtModule),
  },

  {
    path: 'patients', component: ReceptionistsComponent,
    loadChildren: () => import('./receptionists/receptionists.module')
      .then(x => x.ReceptionistsModule),
  },
  {
    path: 'lab', component: LabComponent,
    loadChildren: () => import('./lab/lab.module')
      .then(x => x.LabModule),
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
  // {
  //   path: 'Labtest-list', component: LabtestlistListComponent,
  //   loadChildren: () => import('./pharmacists/pharmacists.module')
  //     .then(e => e.PharmacistsModule)
  // },


  {
    path: 'auth', component: AuthComponent,
    loadChildren: () => import('./auth/auth.module')
      .then(x => x.AuthModule)
  },


  { path: '', redirectTo: 'auth/notfound', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
