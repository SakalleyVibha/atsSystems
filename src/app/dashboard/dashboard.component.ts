import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(){
    let userValid = localStorage.getItem('is_email_verified');
    console.log(userValid);    
  }
}