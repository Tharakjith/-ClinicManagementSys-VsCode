import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DoctordashComponent } from './doctordash/doctordash.component';
import { ReceptionistdashComponent } from './receptionistdash/receptionistdash.component';
import { LabtechniciandashComponent } from './labtechniciandash/labtechniciandash.component';
import { PharmacistdashComponent } from './pharmacistdash/pharmacistdash.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsListComponent } from '../receptionists/patients-list/patients-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    PagenotfoundComponent,
    DoctordashComponent,
    ReceptionistdashComponent,
    LabtechniciandashComponent,
    PharmacistdashComponent, 
    AdmindashComponent,
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule

  ],
  
  
})
export class AuthModule { }
