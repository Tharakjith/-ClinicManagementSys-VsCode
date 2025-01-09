import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

const routes: Routes = [{ path: 'list', component: UsersListComponent },
  { path: 'add', component: UsersAddComponent },
  { path: 'edit/:id', component: UsersEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
