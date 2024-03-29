import { Component } from '@angular/core';
import { CommonApiService } from '../../core/services/common-api.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.css'
})
export class AccountDetailComponent {

  accountDetail: any;
  is_owner: any;

  constructor(private api: CommonApiService) { }

  ngOnInit() {
    this.getAccount();
  }

  getAccount() {
    this.api.allgetMethod('accounts/account').subscribe((res: any) => {
      this.is_owner = localStorage.getItem('is_owner');
      if (!res['data']) {
        console.log("Add Account");
        // this.whichBtn = 'Account';
      } else {
        if (res['data'].length == 1) {
          localStorage.setItem('account_id', res['data'][0].id)
          this.accountDetail = res['data'][0];
          console.log("Add Location");
          // this.whichBtn = 'Location';
        }

      }
    })
  }

}
