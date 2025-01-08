import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ReceptionistsComponent } from './receptionists/receptionists.component';

const routes: Routes = [

  {path : '', redirectTo: '/patients/list', pathMatch: 'full'},


  //Lazy-loading
  {
    path: 'patients', component: ReceptionistsComponent,
    loadChildren: () => import('./receptionists/receptionists.module')
      .then(x => x.ReceptionistsModule),
  },

  // {path: 'auth', component: AuthComponent,
  //   loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
  // } ,

  //Wildcard routes
  { path: '**', redirectTo: 'auth/notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
