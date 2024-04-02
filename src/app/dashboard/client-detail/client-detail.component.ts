import { Component } from '@angular/core';
import { CommonApiService } from '../../core/services/common-api.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
  locationList: any[] = []
  constructor(private api: CommonApiService) {}

  ngOnInit() {
    let shareData:any = localStorage.getItem("Shared_Data");
    shareData = JSON.parse(shareData);
    this.getLocation(shareData?.account_id);
  }

  getLocation(acc_id:any) {
    this.api.allPostMethod('locations/locationlist', { account_id: acc_id, pageNumber: 1, pageSize: 10 }).subscribe((res: any) => {
      if (res['data']) {
        this.locationList = res['data'];
      }
    })
  }

  editLocation(i: number) { }
}
