import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MedicineManagementsComponent } from './medicine-managements/medicine-managements.component';


import { ReceptionistsComponent } from './receptionists/receptionists.component';

import { AdminComponent } from './admin/admin.component';

import { UsersComponent } from './users/users.component';



const routes: Routes = [

  {path : '', redirectTo: '/admin/list', pathMatch: 'full'},


  //Lazy-loading
  
  {path : 'medicine-managements', component: MedicineManagementsComponent,
    loadChildren: () => import ('./medicine-managements/medicine-managements.module')
    .then(p => p.MedicineManagementsModule)
  },
  
  {path : 'auth', component: AuthComponent,
    loadChildren: () => import ('./auth/auth.module')
    .then(x => x.AuthModule)
  },



  {
    path: 'patients', component: ReceptionistsComponent,
    loadChildren: () => import('./receptionists/receptionists.module')
      .then(x => x.ReceptionistsModule),
  },


  // {path: 'auth', component: AuthComponent,
  //   loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
  // } ,


  { 
    path: 'admin',  component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(e => e.AdminModule) 
  },
  { 
    path: 'users',  component: UsersComponent,
    loadChildren: () => import('./users/users.module').then(e => e.UsersModule) 
  },
  

  //Wildcard routes
  { path: '**', redirectTo: 'auth/notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
