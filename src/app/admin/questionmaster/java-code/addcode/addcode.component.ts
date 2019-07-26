import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
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

  inputItems: FormArray;

  constructor(private location: Location,private _codequestion:JavacodeService, private _router:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addJavaCodeForm = this.formBuilder.group({
      question_title: ['', Validators.required],
      allowtime: ['', Validators.required],
      inputItems: this.formBuilder.array([this.createItem()]),
    });
  }

   // convenience getter for easy access to form fields
   get f() { return this.addJavaCodeForm.controls; }

   createItem(): FormGroup {
    return this.formBuilder.group({
      param1: ['', Validators.required],
      param2: ['', Validators.required],
      param3: [''],
      param4: [''],
      param5: [''],
      result: ['', Validators.required],
    });
  }
  get inputPoints() {
    return this.addJavaCodeForm.get('inputItems') as FormArray;
  }
  addItem(): void {
    this.inputPoints.push(this.createItem());
  }
  delInput(index: number): void {
    this.inputPoints.removeAt(index);
  }

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
