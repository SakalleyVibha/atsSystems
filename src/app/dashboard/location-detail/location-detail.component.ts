import { Component } from '@angular/core';
import { CommonApiService } from '../../core/services/common-api.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.css'
})
export class LocationDetailComponent {

  locationList: any[] = []
  role_permission: any;
  is_owner: any;

  constructor(private api: CommonApiService) {
    this.role_permission = localStorage.getItem("role");
    this.role_permission = JSON.parse(this.role_permission);
  }

  ngOnInit() {
    let shareData: any = localStorage.getItem("Shared_Data");
    shareData = JSON.parse(shareData);
    this.is_owner = shareData?.is_owner;
    this.getLocation(shareData?.account_id);
  }

  getLocation(acc_id: number) {
    this.api.allPostMethod('locations/locationlist', { account_id: acc_id, pageNumber: 1, pageSize: 10 }).subscribe((res: any) => {
      if (res['data']) {
        this.locationList = res['data'];
        console.log('this.locationList: ', this.locationList);
        // this.whichBtn = 'Account';
      }
    })
  }

  editLocation(i: number) { }

}
