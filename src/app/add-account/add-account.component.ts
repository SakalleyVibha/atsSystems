import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonApiService } from '../core/services/common-api.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})
export class AddAccountComponent {
  addAccountForm!: FormGroup;
  isAccountAdd: boolean = false;
  fileTypeBase64!: ArrayBuffer | any;

  constructor(private fb: FormBuilder, private commonApi: CommonApiService) {
    this.addAccountForm = this.fb.group({
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

  get addusercontrol() { return this.addAccountForm.controls }

  submitForm() {
    if (this.addAccountForm.invalid) {
      return;
    }
    this.addAccountForm.value.logo = this.fileTypeBase64;
    let formData = this.addAccountForm.value
    this.isAccountAdd = true
    this.commonApi.allPostMethod("accounts/account", formData).subscribe((res: any) => {
      console.log("After Account add : ", res);
    });
  }

  convertImageToBase64(file_event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file_event.srcElement.files[0]);
    reader.onload = () => {
      this.fileTypeBase64 = reader.result
    };
  }
}