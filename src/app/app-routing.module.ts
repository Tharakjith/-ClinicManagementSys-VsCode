import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';

import { UsersComponent } from './users/users.component';


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
    path: 'users',  component: UsersComponent,
    loadChildren: () => import('./users/users.module').then(e => e.UsersModule) 
  },
  
  //Wildcard routes
  {path: '**', redirectTo: 'auth/notfound', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
