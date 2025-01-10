import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterListComponent } from './register-list/register-list.component';
import { RegisterAddComponent } from './register-add/register-add.component';
import { RegisterEditComponent } from './register-edit/register-edit.component';

const routes: Routes = [{ path: 'list', component: RegisterListComponent },
  { path: 'add', component: RegisterAddComponent },
  { path: 'edit/:id', component: RegisterEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
