import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import {MultiplequestionsService} from '../../../../services/multiplequestions.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {

  addMultiQuestionForm: FormGroup;
  strMessage: string;
  submitted = false;

  constructor(private location: Location,private _multiquestion:MultiplequestionsService, private _router:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addMultiQuestionForm = this.formBuilder.group({
      question_title: ['', Validators.required],
      ans1: ['', Validators.required],
      ans2: ['', Validators.required],
      ans3: ['', Validators.required],
      ans4: [''],
      ans5: [''],
      correctanswer: ['', Validators.required],
      allowtime: ['', Validators.required]
    });
  }

   // convenience getter for easy access to form fields
  get f() { return this.addMultiQuestionForm.controls; }

  save_newquestion(){
    this.submitted = true;
    if (this.addMultiQuestionForm.invalid) {
     
      return;
    } else {
      this._multiquestion.addnewquestion(JSON.stringify(this.addMultiQuestionForm.value))
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
