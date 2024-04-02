import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonApiService } from '../core/services/common-api.service';
import { ResetTempPasswordComponent } from '../reset-temp-password/reset-temp-password.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  @ViewChild('mymodal') mymodal: ElementRef | undefined;

  whichBtn: string = '';

  userValid: any
  shareData:any;
  constructor(private modal: NgbModal, private router: Router, private api: CommonApiService) {
    this.shareData = localStorage.getItem('Shared_Data');
    this.shareData = JSON.parse(this.shareData);
    this.userValid = this.shareData?.is_email_valid;
    if(this.shareData?.temp_pass == true ){
      this.modal.open(ResetTempPasswordComponent, { backdrop: false });
    }
  }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    if (this.userValid == 0 && this.shareData?.temp_pass == false) {
      this.modal.open(this.mymodal, { ariaLabelledBy: 'modal-basic-title', backdrop: false }).result.then(() => { 
        localStorage.clear(); 
        this.router.navigate(['/login']);
      });
    }
  }  

  addLocation() {
    console.log("Add Location Executed");
    this.router.navigate(['add-location']);
  }

  addAccount() {
    console.log("Add Account Executed");
    this.router.navigate(['add-account']);
  }
}