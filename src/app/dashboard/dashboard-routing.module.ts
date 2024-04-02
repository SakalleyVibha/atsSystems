import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  children: [
    { path: '', loadChildren: () => import('./account-detail/account-detail.module').then(m => m.AccountDetailModule) },
    { path: 'account-detail', loadChildren: () => import('./account-detail/account-detail.module').then(m => m.AccountDetailModule) },
    { path: 'location-detail', loadChildren: () => import('./location-detail/location-detail.module').then(m => m.LocationDetailModule) },
    { path: 'client-detail', loadChildren: () => import('./client-detail/client-detail.module').then(m => m.ClientDetailModule) }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
