import { Component } from '@angular/core';
import { FormBuilder, Validators,FormGroup,AbstractControl, FormControl } from '@angular/forms';
import { CommonApiService } from '../core/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login:FormGroup;

  constructor(private fb: FormBuilder,private Common:CommonApiService,private toast:ToastrService,private router:Router){
    this.login = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    })
  }
  
  get field() { return this.login.controls }

  Submit(){
    console.log(this.login.value);
    this.login.reset();
    this.toast.success("Login successfully","On button click",{
      timeOut: 2000,
      positionClass: 'toast-top-right',
      tapToDismiss:true,
      progressBar:true
    }).onHidden.subscribe(()=>{
      this.router.navigate(['/sign-up']);
    })
  }
}
