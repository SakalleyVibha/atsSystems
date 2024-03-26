import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authenticateGuard } from './core/guards/authenticate.guard';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'login', component:LoginComponent},
  { path: 'sign-up', component:SignUpComponent},
  { path: 'forget-password', component:ForgotPasswordComponent},
  { path: 'dashboard', component:DashboardComponent,canActivate:[authenticateGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
