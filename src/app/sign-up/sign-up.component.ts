import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { delay, of } from 'rxjs';
import { CommonApiService } from '../core/services/common-api.service';
import moment from 'moment';
import { ConfirmedValidator } from '../shared/otherfiles/confirmed.validator';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUp:FormGroup
  successDone:Boolean = false
  isMessageShow = of(this.successDone);
  ispasswordshow:Boolean = false
  isconfirmpasswordshow:Boolean = false
  
  constructor(private fb:FormBuilder,private common:CommonApiService){
    this.signUp = this.fb.group({
      f_name: ['',[Validators.required,Validators.minLength(2)]],
      l_name:['',[Validators.required,Validators.minLength(2)]],
      alias:['',[Validators.required]],
      dob:['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      website:[''],
      phone: ['',[Validators.required,Validators.pattern('[6-9][0-9]{12}')]],
      mobile: ['',[Validators.required,Validators.pattern('[6-9][0-9]{12}')]],

      fax: [''],
      street:['',[Validators.required]],
      city:['',[Validators.required]],
      country:['',[Validators.required]],
      state:['',[Validators.required]],
      zip:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
      password: ['',[Validators.required,Validators.pattern('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$'),Validators.minLength(8)]],
      confirmpassword: ['',[Validators.required]],
    },
    {
      validator: ConfirmedValidator
    } as AbstractControlOptions)
  }

  get formField() { return this.signUp.controls }

  submit(){
    // let date = moment(this.signUp.value.dob).format("DD-MM-yyyy");
    let date = this.convertDate(this.signUp.value.dob);
    this.signUp.patchValue({dob:date});
    const formCopy = Object.assign({}, this.signUp.getRawValue());
    delete formCopy.confirmpassword;
    this.successDone = true
    this.common.allPostMethod("users/signup",formCopy).subscribe((res:any)=>{
      console.log(res);
      if(!res.error){
        this.isMessageShow.pipe(
          delay(2000)
          ).subscribe(()=>{
            this.successDone = false
          });
          this.signUp.reset();
        }
    });
  }

  convertDate(dateString:string) {
    var parts = dateString.split("-");
    var newParts = [parts[1], parts[2], parts[0]];
    var newDateString = newParts.join("-");
    return newDateString;
  }
}
