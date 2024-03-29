import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDetailRoutingModule } from './account-detail-routing.module';
import { AccountDetailComponent } from './account-detail.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    AccountDetailComponent,
    ManageAccountComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AccountDetailRoutingModule
  ]
})
export class AccountDetailModule { }
