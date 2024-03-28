import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonApiService } from '../core/services/common-api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  @ViewChild('mymodal') mymodal: ElementRef | undefined;

  whichBtn: string = '';

  userValid: any
  constructor(private modal: NgbModal, private router: Router, private api: CommonApiService) {
    this.userValid = localStorage.getItem('is_email_verified');
  }
  ngOnInit() {
    this.getAccount();
  }
  ngAfterViewInit(): void {
    if (this.userValid == 0) {
      this.open(this.mymodal);
    }
  }
  open(content: any) {
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: false }).result.then(() => { this.router.navigate(['/login']); });
  }

  addLocation() {
    console.log("Add Location Executed");
    this.router.navigate(['add-location']);
  }

  addAccount() {
    console.log("Add Account Executed");
    this.router.navigate(['add-account']);
  }

  getAccount() {
    this.api.allgetMethod('accounts/account').subscribe((res: any) => {
      if (!res['data']) {
        console.log("Add Account");
        this.whichBtn = 'Account';
      } else {
        if (res['data'].length == 1) {
          localStorage.setItem('account_id', res['data'][0].id)
          console.log("Add Location");
          this.whichBtn = 'Location';
        }

      }
    })
  }
}