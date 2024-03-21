import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators, AbstractControl, AbstractControlOptions, ValidationErrors } from '@angular/forms';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUp:FormGroup
  successDone:Boolean = false
  isMessageShow = of(this.successDone);

  constructor(private fb:FormBuilder){
    this.signUp = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(2)]],
      email: ['',[Validators.required,Validators.email]],
      contact: ['',[Validators.required,Validators.pattern('[6-9][0-9]{9}')]],
      password: ['',[Validators.required,Validators.pattern('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$'),Validators.minLength(8)]],
      confirmpassword: ['',[Validators.required]],
    },{
      validator: this.ConfirmedValidator
    } as AbstractControlOptions)
  }

  get formField() { return this.signUp.controls }

  submit(){
    this.successDone = true
    console.log(this.signUp.value);
    this.signUp.reset();
    this.isMessageShow.pipe(
      delay(2000)
    ).subscribe(()=>{
      this.successDone = false
    });
  }

  ConfirmedValidator(formGroup: AbstractControl) {
        const control = formGroup.get('password')?.value;
        const matchingControl = formGroup.get('confirmpassword')?.value;
        if (matchingControl.errors && !matchingControl.errors['ConfirmedValidator']) {
            return null;
        }
        if (control !== matchingControl) {
           return formGroup.get('confirmpassword')?.setErrors({ confirmpassword: true });
        }
  }

}
