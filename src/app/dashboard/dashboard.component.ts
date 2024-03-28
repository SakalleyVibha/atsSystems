import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  @ViewChild('mymodal') mymodal: ElementRef | undefined;
  
  userValid:any
  constructor(private modal:NgbModal,private router:Router){
    this.userValid = localStorage.getItem('is_email_verified');
  }
  ngOnInit(){
  
  }
  ngAfterViewInit(): void {
    if(this.userValid == 0){
      this.open(this.mymodal);
    }
  }
  open(content: any) {
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' , backdrop:false }).result.then(() => {this.router.navigate(['/login']);});
  }
}