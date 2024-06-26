import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonApiService } from '../../../core/services/common-api.service';

@Component({
  selector: 'app-manage-location',
  templateUrl: './manage-location.component.html',
  styleUrl: './manage-location.component.css'
})
export class ManageLocationComponent {

  addLocationForm!: FormGroup;
  convertedBase: string | any;

  constructor(private fb: FormBuilder, private commonApi: CommonApiService) {
    this.addLocationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      about: ['', [Validators.required]],
      website: ['', [Validators.required, Validators.pattern('.*\.(?:com|net|in|org|io)$')]],
      phone: ['', [Validators.required, Validators.pattern('[6-9][0-9]{12}')]],
      mobile: ['', [Validators.required, Validators.pattern('[6-9][0-9]{12}')]],
      fax: [''],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      logo: ['', [Validators.required]]
    });
  }

  get addusercontrol() { return this.addLocationForm.controls }

  submitForm() {
    if (this.addLocationForm.invalid) {
      return;
    }
    this.addLocationForm.value.logo = this.convertedBase;
    let share_data: any = localStorage.getItem('Shared_Data');
    share_data = JSON.parse(share_data);
    this.addLocationForm.value['account_id'] = share_data.account_id;
    this.commonApi.allPostMethod('locations/location', this.addLocationForm.value).subscribe((res) => {
      console.log("After Location add : ", res);
    })
  }

  convertImageToBase64(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.srcElement.files[0]);
    reader.onload = () => {
      this.convertedBase = reader.result
    };
  }

}
