import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, AbstractControlOptions } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonApiService } from '../core/services/common-api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  forget_password!: FormGroup;
  email_only!:FormGroup;
  otp: string = '';
  finalOtp: string = '';
  submitted: boolean = false;
  getOTP:Boolean = false;
  ispasswordshow:Boolean = false;
  isconfirmpasswordshow:Boolean = false;
  constructor(private fb: FormBuilder, private toast: ToastrService, private common : CommonApiService) {
    this.email_only = this.fb.group({
      email:['',[Validators.required,Validators.email]]
    });

    this.forget_password = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp1: ['', [Validators.required]],
      otp2: ['', [Validators.required]],
      otp3: ['', [Validators.required]],
      otp4: ['', [Validators.required]],
      otp5: ['', [Validators.required]],
      otp6: ['', [Validators.required]],
      new_password:['',[Validators.required,Validators.pattern("(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$"),Validators.minLength(8)]],
      confirm_password:['',[Validators.required]]
    },{
      validator: this.ConfirmedValidator
    } as AbstractControlOptions);
  }

  get emailData() { return this.email_only.controls }
  get formData() { return this.forget_password.controls }

  onKeyDown(event: any, previous: any, next: any) {
    if (next != '') next.focus();
    if (event.key == 'Backspace') if (previous != '') previous.focus();
    
    if (this.forget_password.value.otp1 != '' && this.forget_password.value.otp2 != '' && this.forget_password.value.otp3 != '' && this.forget_password.value.otp4 != '' && this.forget_password.value.otp5 != '' && this.forget_password.value.otp6 != '') {
      this.submitted = false
    } else {
      this.submitted = true
    }
  }

  ConfirmedValidator(formGroup: AbstractControl) {
    const control = formGroup.get('new_password');
    const matchingControl = formGroup.get('confirm_password');
    if (matchingControl?.errors && !matchingControl.errors['ConfirmedValidator']) {
        return null;
    }
    if (control?.value !== matchingControl?.value) {
       return formGroup.get('confirm_password')?.setErrors({ confirm_password: true });
    }
}
  sendOtpMail(){
    this.common.allPostMethod("users/forgotPassword",this.email_only.value).subscribe((res:any)=>{
      if(res.error){
        this.toast.error(res.error,"Something Wrong");
      }else{
        this.toast.info(res.message,"OTP send successfully");
        this.getOTP = true
        this.forget_password.patchValue({email:this.email_only.value.email});
      }
    });
}
  resetPassword() {
    if (this.forget_password.valid == false) {
      this.submitted = true
      return
    }
    this.finalOtp = this.forget_password.value.otp1+this.forget_password.value.otp2+this.forget_password.value.otp3+this.forget_password.value.otp4+this.forget_password.value.otp5+this.forget_password.value.otp6
    this.submitted = false
    let Data = {
      otp: this.finalOtp,
      email: this.forget_password.value.email,
      password: this.forget_password.value.new_password
    }
    this.common.allPostMethod("users/changePassword",Data).subscribe((res:any)=>{
      if(res.message) this.getOTP = false
      if(res.error) this.toast.error(res.error,"Wrong credential")
    });
    this.forget_password.reset();
  }
}
