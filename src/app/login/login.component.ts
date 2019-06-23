import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  strMessage: string;
  submitted = false;
  data: any;
  constructor(private router: Router,
              private api: UserService,
              private formBuilder: FormBuilder,
              private session: SessionStorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.session.get('currentUser')) {
      // logged in so return true
      this.router.navigate(['/admin']);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
      this.submitted = true;
      if (this.loginForm.invalid) {
        return;
      } else {
          this.api.login(JSON.stringify(this.loginForm.value))
          .subscribe(data=>{
              this.data = data;
              
              if(this.data === 'failed'){
                this.strMessage = "Invalid Login Details";
              }
              else{
                this.session.set('currentUser', this.data._id);
                this.router.navigate(['/admin']);
              }
            },err => {
              this.strMessage = err.error.msg;
            }); 
      }
  }
}
