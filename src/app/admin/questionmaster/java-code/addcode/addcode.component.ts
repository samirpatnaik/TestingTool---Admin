import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import {JavacodeService} from '../../../../services/javacode.service';

@Component({
  selector: 'app-addcode',
  templateUrl: './addcode.component.html',
  styleUrls: ['./addcode.component.css']
})
export class AddcodeComponent implements OnInit {

  addJavaCodeForm: FormGroup;
  strMessage: string;
  submitted = false;
  constructor(private location: Location,private _codequestion:JavacodeService, private _router:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addJavaCodeForm = this.formBuilder.group({
      question_title: ['', Validators.required],
      allowtime: ['', Validators.required],
    });
  }

   // convenience getter for easy access to form fields
   get f() { return this.addJavaCodeForm.controls; }

   save_newquestion(){
     this.submitted = true;
     if (this.addJavaCodeForm.invalid) {
      
       return;
     } else {
       this._codequestion.addnewquestion(JSON.stringify(this.addJavaCodeForm.value))
       .subscribe(
         data=> {
           setTimeout(() => {
             this.location.back();
           }, 1000);  //1s
         },
         error=>console.error(error)
       )
     }
   }

}
