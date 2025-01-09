import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [

  {path : '', redirectTo: '/admin/list', pathMatch: 'full'},


  //Lazy Loading
  {path:'doctor',component:DoctorComponent,
    loadChildren: () => import('./doctor/doctor.module')
    .then(e=>e.DoctorModule)
  },

//   {path:'auth',component:AuthComponent,
//   loadChildren:() =>import('./auth/auth.module')
//   .then(x => x.AuthModule)
// },


  {path: '**',redirectTo: 'auth/notfound',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
