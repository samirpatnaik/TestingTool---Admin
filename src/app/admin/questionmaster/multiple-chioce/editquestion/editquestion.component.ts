import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MultiplequestionsService} from '../../../../services/multiplequestions.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css']
})
export class EditquestionComponent implements OnInit {

  editMultiQuestionForm: FormGroup;
  strMessage: string;
  submitted = false;
  data: any;

  constructor(private location: Location,private _multiquestion:MultiplequestionsService, private _router:ActivatedRoute, private formBuilder: FormBuilder) { }

   // convenience getter for easy access to form fields
   get f() { return this.editMultiQuestionForm.controls; }

  ngOnInit() {
    this.editMultiQuestionForm = this.formBuilder.group({
      question_title: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: [''],
      answer5: [''],
      correctanswer: ['', Validators.required],
      allowtime:['', Validators.required],
      rid:['']
    });

    this._multiquestion.getQuestionByID(this._router.snapshot.paramMap.get('id'))
      .subscribe(
        qinfo =>{
          this.editMultiQuestionForm.patchValue({
            question_title: qinfo.question_title, 
            answer1: qinfo.answer1,
            answer2: qinfo.answer2,
            answer3: qinfo.answer3,
            answer4: qinfo.answer4,
            answer5: qinfo.answer5,
            correctanswer: qinfo.correctanswer,
            allowtime: qinfo.allowtime,
            rid: qinfo._id
          });
        }
      );
  }

  update_question() {
    this.submitted = true;
    if (this.editMultiQuestionForm.invalid) {
      return;
    } else {
      this._multiquestion.updatequestion(this.editMultiQuestionForm.value)
      .subscribe(result =>{
          setTimeout(() => {
            this.location.back();
          }, 1000);  //1s
      });
    }
  }
}
