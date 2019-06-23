import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {JavacodeService} from '../../../../services/javacode.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-editcode',
  templateUrl: './editcode.component.html',
  styleUrls: ['./editcode.component.css']
})
export class EditcodeComponent implements OnInit {

  editJavaCodeForm: FormGroup;
  strMessage: string;
  submitted = false;


  constructor(private location: Location,private _javcodeservice:JavacodeService, private _router:ActivatedRoute, private formBuilder: FormBuilder) { }

  // convenience getter for easy access to form fields
  get f() { return this.editJavaCodeForm.controls; }

  ngOnInit() {
    this.editJavaCodeForm = this.formBuilder.group({
      question_title: ['', Validators.required],
      allowtime: ['', Validators.required],
      rid:['']
    });
    this._javcodeservice.getQuestionByID(this._router.snapshot.paramMap.get('id'))
    .subscribe(
      qinfo =>{
        this.editJavaCodeForm.patchValue({
          question_title: qinfo.question_title, 
          allowtime: qinfo.allowtime,
          rid: qinfo._id
        });
      }
    );
  }
  update_question() {
    this.submitted = true;
    if (this.editJavaCodeForm.invalid) {
      return;
    } else {
      this._javcodeservice.updatequestion(this.editJavaCodeForm.value)
      .subscribe(result =>{
          setTimeout(() => {
            this.location.back();
          }, 1000);  //1s
      });
    }
  }
}
