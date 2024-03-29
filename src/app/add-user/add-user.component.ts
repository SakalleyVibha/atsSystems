import { Component } from '@angular/core';
import { FormGroup , FormBuilder , Validators, AbstractControlOptions } from '@angular/forms';
import { CommonApiService } from '../core/services/common-api.service';
import { ConfirmedValidator } from '../shared/otherfiles/confirmed.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addUserForm:FormGroup;
  ispasswordshow:boolean = false;
  isconfirmpasswordshow:boolean = false;
  accountID:any;
  locationID:any;
  rollData :Array<any> = [
    {
        "id": 1,
        "name": "Admin"
    },
    {
        "id": 2,
        "name": "Location Manager"
    },
    {
        "id": 3,
        "name": "Client Manager"
    },
    {
        "id": 4,
        "name": "Client Recruiter"
    }
  ]
  constructor(private commonApi:CommonApiService,private fb:FormBuilder,private toast:ToastrService,private router:Router){

    this.commonApi.allgetMethod("accounts/account").subscribe((response:any)=>{
      response['data'].map((item:any)=>{
        this.accountID = item.id
        this.locationID = item.account_locations;
      });
    });

    this.addUserForm = this.fb.group({
      f_name:['',[Validators.required,Validators.minLength(2)]],
      l_name:['',[Validators.required,Validators.minLength(2)]],
      alias:['',[Validators.required]],
      dob:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      website:['',[Validators.required,Validators.pattern('.*\.(?:com|net|in|org|io)$')]],
      phone:['',[Validators.required,Validators.pattern('[6-9][0-9]{12}')]],
      mobile:['',[Validators.required,Validators.pattern('[6-9][0-9]{12}')]],
      fax:[''],
      
      street:['',[Validators.required]],
      city:['',[Validators.required]],
      country:['',[Validators.required]],
      state:['',[Validators.required]],
      zip:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
      role_id:[''],
      account_id:['16'],
      location_id:[''],
      client_id:['0'],
    },{
      validator : ConfirmedValidator
    } as AbstractControlOptions);
  }

  get addUserData() { return this.addUserForm.controls }

  submitUserForm(){
    // let date = moment(this.addUserForm.value.dob).format("DD-MM-yyyy");
    let date = this.convertDate(this.addUserForm.value.dob);
    this.addUserForm.patchValue({
      dob:date,
      role_id:Number(this.addUserForm.value.role_id),
      account_id:Number(this.addUserForm.value.account_id),
      location_id:Number(this.addUserForm.value.location_id),
      client_id:Number(this.addUserForm.value.client_id)
    });
    this.commonApi.allPostMethod("users/addUser",this.addUserForm.value).subscribe((res:any)=>{
      console.log("After user added response : ",res);
      if(res.message){
        this.toast.success("User added successfully.","Done",{closeButton:true}).onAction.subscribe(()=>{
          this.router.navigate(['/dashboard']);
        });
      }
    });
    console.log(this.addUserForm.value);
    
  }
  convertDate(dateString:string) {
  var parts = dateString.split("-");
  var newParts = [parts[1], parts[2], parts[0]];
  var newDateString = newParts.join("-");
  return newDateString;
  }
}

// submitUserForm(){
//   let europeanDate = this.convertDate(this.addUserForm.value.dob)
//   console.log(typeof europeanDate," && ",europeanDate," && ",typeof this.addUserForm.value.dob);
//   this.addUserForm.patchValue({dob:europeanDate});
//   this.commonApi.allPostMethod("users/addUser",this.addUserForm.value).subscribe((res:any)=>{
//     console.log("After user added response : ",res);
//   });
// }
// convertDate(dateString:string) {
//   var parts = dateString.split("-");
//   var newParts = [parts[1], parts[2], parts[0]];
//   var newDateString = newParts.join("-");
//   return newDateString;
// }

// const dateq = new Date(this.addUserForm.value.dob);
// const formatter = new Intl.DateTimeFormat('en-GB', {
// day: 'numeric',
// month: 'numeric',
// year: 'numeric',
// });
// const europeanDate = formatter.format(dateq).replace(/\//g, '-');;
// console.log(europeanDate);
