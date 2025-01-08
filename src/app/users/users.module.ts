import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersAddComponent,
    UsersEditComponent
  ],
  imports: [
   CommonModule,
       UsersRoutingModule,
       NgxPaginationModule,
       Ng2SearchPipeModule,
       FormsModule  
  ]
})
export class UsersModule { }
