import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControlOptions, FormBuilder,Validators } from '@angular/forms';
import { CommonApiService } from '../core/services/common-api.service';
import { ConfirmedValidator } from '../shared/otherfiles/confirmed.validator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-temp-password',
  templateUrl: './reset-temp-password.component.html',
  styleUrl: './reset-temp-password.component.css'
})
export class ResetTempPasswordComponent {
  changeTempPasswordForm:any;
  isconfirmpasswordshow:boolean = false;
  ispasswordshow:boolean = false; 
  isPasswordReset:boolean = false;

  constructor(public activeModal:NgbActiveModal,private fb:FormBuilder,private toast:ToastrService,private commonApi:CommonApiService,private router:Router){
    let userid = localStorage.getItem('user_id');
    this.changeTempPasswordForm = this.fb.group({
      id:Number(userid),
      password:['',[Validators.required,Validators.minLength(8),Validators.pattern("(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$")]],
      confirmpassword:['',[Validators.required]]
    },{
      validator: ConfirmedValidator
    } as AbstractControlOptions);
  }

  get formData() { return this.changeTempPasswordForm.controls }

  resetPassword(){
    let formData = Object.assign({},this.changeTempPasswordForm.value);
    delete formData.confirmpassword
    this.commonApi.allPostMethod('users/changeUsersPassword',formData).subscribe((res:any)=>{
      console.log("After Change Password : ",res);
      if(res.message){
        this.isPasswordReset = true;
        this.toast.success("Password updated successfully","Done",{
          closeButton:true,
          timeOut:2000
        }).onHidden.subscribe(()=>{
          this.activeModal.close();
          this.router.navigate(['/login']);
        });
      }else{
        this.toast.error("Unable to update password try again later.","Something went wrong",{closeButton:true,timeOut:1500}).onHidden.subscribe(()=>{
          this.changeTempPasswordForm.reset();
        });
      }
    });
  }

}
