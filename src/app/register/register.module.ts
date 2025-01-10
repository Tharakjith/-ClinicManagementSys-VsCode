import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterListComponent } from './register-list/register-list.component';
import { RegisterEditComponent } from './register-edit/register-edit.component';
import { RegisterAddComponent } from './register-add/register-add.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRoutingModule } from '../admin/admin-routing.module';


@NgModule({
  declarations: [
    RegisterComponent,
    RegisterListComponent,
    RegisterEditComponent,
    RegisterAddComponent
  ],
  imports: [
    CommonModule,
          RegisterRoutingModule,
          NgxPaginationModule,
          Ng2SearchPipeModule,
          FormsModule  
  ]
})
export class RegisterModule { }
