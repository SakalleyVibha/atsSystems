import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDetailRoutingModule } from './client-detail-routing.module';
import { ClientDetailComponent } from './client-detail.component';


@NgModule({
  declarations: [
    ClientDetailComponent
  ],
  imports: [
    CommonModule,
    ClientDetailRoutingModule
  ]
})
export class ClientDetailModule { }
