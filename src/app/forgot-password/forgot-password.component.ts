import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  forget_password!: FormGroup;
  otpArray: Array<any> = [];
  otp: string = '';
  finalOtp: string = '';
  submitted: boolean = false

  constructor(private fb: FormBuilder, private toast: ToastrService) {
    this.forget_password = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp1: ['', [Validators.required]],
      otp2: ['', [Validators.required]],
      otp3: ['', [Validators.required]],
      otp4: ['', [Validators.required]],
      otp5: ['', [Validators.required]],
      otp6: ['', [Validators.required]]
    });
  }

  get formData() { return this.forget_password.controls }

  onKeyDown(event: any, previous: any, next: any) {
    if (next != '') {
      next.focus();
    }
    if (event.key == 'Backspace') {
      if (previous != '') {
        previous.focus();
      }
    }
    if (this.forget_password.value.otp1 != '' && this.forget_password.value.otp2 != '' && this.forget_password.value.otp3 != '' && this.forget_password.value.otp4 != '' && this.forget_password.value.otp5 != '' && this.forget_password.value.otp6 != '') {
      this.submitted = false
    } else {
      this.submitted = true
    }
  }

  resetPassword() {
    if (this.forget_password.valid == false) {
      this.submitted = true
      return
    }
    this.finalOtp = this.forget_password.value.otp1+this.forget_password.value.otp2+this.forget_password.value.otp3+this.forget_password.value.otp4+this.forget_password.value.otp5+this.forget_password.value.otp6
    this.submitted = false
    let Data = {
      email: this.forget_password.value.email,
      otp: this.finalOtp
    }
    this.forget_password.reset();
  }
}
