import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './account-detail.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: AccountDetailComponent },
    { path: 'add', component: ManageAccountComponent },
    { path: 'edit', component: ManageAccountComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDetailRoutingModule { }
