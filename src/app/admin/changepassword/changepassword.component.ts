import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { MustMatch } from './must-match.validator';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  changepwdForm: FormGroup;
  strMessage: string;
  submitted = false;
  data: any;

  constructor(private _user:UserService, private _router:Router, private formBuilder: FormBuilder) {   }

  ngOnInit() {
    this.changepwdForm = this.formBuilder.group({
      uname: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, {
        validator: MustMatch('newPassword', 'confirmNewPassword')
    });
  }

 // convenience getter for easy access to form fields
 get f() { return this.changepwdForm.controls; }

 change_password() {
  
   this.submitted = true;
   if (this.changepwdForm.invalid) {
    
     return;
   } else {
    console.log(this.changepwdForm.value);
    this._user.updatepwd(JSON.stringify(this.changepwdForm.value))
      .subscribe(data=>{
          this.data = data;
          if(this.data === 'userfailed'){
            this.strMessage = "Invalid User Name";
          }
          else if(this.data === 'passwordfailed'){
            this.strMessage = "Invalid Old Password";
          }
          else{
            this.strMessage = "Password Updated Successfully";
          }
        },err => {
          this.strMessage = err.error.msg;
        }); 
     
   }
 }
}
