import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionistdashComponent } from './receptionistdash/receptionistdash.component';

const routes: Routes = [
  {path: 'receptionist', component: ReceptionistdashComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
