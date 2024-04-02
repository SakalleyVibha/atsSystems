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
  ispasswordshow: Boolean = false;
  allRoles: any[] = [];

  constructor(private fb: FormBuilder, private apiService: CommonApiService, private toast: ToastrService, private router: Router) {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit() {
    this.getAllRoles();
  }

  get field() { return this.login.controls }

  Submit() {
    this.apiService.allPostMethod("application/login", this.login.value).subscribe((res: any) => {
      if (!res.error) {
        let roleInfo = res['data'].roleInfo;
        if (roleInfo && roleInfo.length > 0) {
          let which_role = roleInfo[0].role_master;
          let role_idx = this.allRoles.find((f: any) => f.id == which_role.id && f.name == which_role.name);
          if (role_idx != undefined) {
            localStorage.setItem('role', JSON.stringify(role_idx));
          }
        }
        localStorage.setItem('token', res.data['token']);
        localStorage.setItem('Shared_Data', JSON.stringify({
          is_email_valid : res.data['is_email_verified'],
          temp_pass : res.data['is_tempPassword'],
          user_id : res.data['id'],
          is_owner : res.data['is_owner'],
        }));
        this.toast.success("Login successfully", "Valid user", { timeOut: 500 ,closeButton: true }).onHidden.subscribe(()=>{
          this.login.reset();
          this.router.navigate(['/dashboard']);
        });
      } else {
        this.toast.error(res.error, "Something", { timeOut: 1000 });
      }
    });
  }

  getAllRoles() {
    this.apiService.allgetMethod('role/roles').subscribe((res: any) => {
      if (!res['error']) {
        this.allRoles = res['data'];
      }
    });
  }
}
