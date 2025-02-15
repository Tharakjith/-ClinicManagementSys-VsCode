import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DavailRoutingModule } from './davail-routing.module';
import { DavailComponent } from './davail.component';
import { DavailAddComponent } from './davail-add/davail-add.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DavailComponent,
    DavailAddComponent
  ],
  imports: [
    CommonModule,
    DavailRoutingModule,
    FormsModule
  ]
})
export class DavailModule { }
