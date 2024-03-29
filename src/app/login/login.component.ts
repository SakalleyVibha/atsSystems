import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonApiService } from '../core/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: FormGroup;
  ispasswordshow: Boolean = false

  constructor(private fb: FormBuilder, private Common: CommonApiService, private toast: ToastrService, private router: Router) {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get field() { return this.login.controls }

  Submit() {
    this.Common.allPostMethod("application/login", this.login.value).subscribe((res: any) => {
      if (!res.error) {
        console.log("AddUser Data : ", res.data);
        let token = res.data['token']
        let is_email_valid = res.data['is_email_verified'];
        let temp_pass = res.data['is_tempPassword']
        localStorage.setItem('is_email_verified', is_email_valid);
        localStorage.setItem('token', token);
        localStorage.setItem('temp_pass', temp_pass);
        localStorage.setItem('user_id', res.data['id']);
        localStorage.setItem('is_owner', res.data['is_owner']);
        this.toast.success("Login successfully", "Valid user", { closeButton: true });
        this.router.navigate(['/dashboard']);
      } else {
        this.toast.error(res.error, "Something", { timeOut: 1000 });
      }
    });
    this.login.reset();
  }
}
