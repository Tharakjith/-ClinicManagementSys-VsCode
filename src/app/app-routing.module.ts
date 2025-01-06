import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

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
  //Wildcard routes
  {path: '**', redirectTo: 'auth/notfound', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
