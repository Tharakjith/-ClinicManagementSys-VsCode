import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MedicineManagementsComponent } from './medicine-managements/medicine-managements.component';


const routes: Routes = [
//Empty Routes
{
  path: '', redirectTo: 'auth/login', pathMatch: 'full'
},
  //Lazy-loading
  
  {path : 'medicine-managements', component: MedicineManagementsComponent,
    loadChildren: () => import ('./medicine-managements/medicine-managements.module')
    .then(p => p.MedicineManagementsModule)
  },
  
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
