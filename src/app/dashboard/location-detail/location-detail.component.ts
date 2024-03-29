import { Component } from '@angular/core';
import { CommonApiService } from '../../core/services/common-api.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.css'
})
export class LocationDetailComponent {

  locationList: any[] = []

  constructor(private api: CommonApiService) {
  }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    let acc_id: any = localStorage.getItem('account_id');
    this.api.allPostMethod('locations/locationlist', { account_id: acc_id, pageNumber: 1, pageSize: 10 }).subscribe((res: any) => {
      if (res['data']) {
        this.locationList = res['data'];
        // this.whichBtn = 'Account';
      }
    })
  }

  editLocation(i: number) { }

}
