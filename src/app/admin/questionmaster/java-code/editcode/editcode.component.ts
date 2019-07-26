import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
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
      inputItems: this.formBuilder.array([this.createItem()]),
      rid:['']
    });

    const items = (<FormArray>this.editJavaCodeForm.get('inputItems'));
    for (let i = 0; i < items.length; i++) {
        items.removeAt(i);
    }
    
    this._javcodeservice.getQuestionByID(this._router.snapshot.paramMap.get('id'))
    .subscribe(
      qinfo =>{
        this.editJavaCodeForm.patchValue({
          question_title: qinfo.question_title,
          allowtime: (qinfo.allowtime)/60,
          rid: qinfo._id,
        });
        for (let index = 0; index <= qinfo.inputItems.length; index++) {
          this.inputPoints.push(this.formBuilder.group({
                    param1: qinfo.inputItems[index].param1,
                    param2: qinfo.inputItems[index].param2,
                    param3: qinfo.inputItems[index].param3,
                    param4: qinfo.inputItems[index].param4,
                    param5: qinfo.inputItems[index].param5,
                    result: qinfo.inputItems[index].result
          }));
        } 
              
      }
    );
  }

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
    return this.editJavaCodeForm.get('inputItems') as FormArray;
  }
  addItem(): void {
    this.inputPoints.push(this.createItem());
  }
  delInput(index: number): void {
    this.inputPoints.removeAt(index);
  }

  update_question() {
    this.submitted = true;
    if (this.editJavaCodeForm.invalid) {
      return;
    } else {
      //console.log(this.editJavaCodeForm.value);
      this._javcodeservice.updatequestion(this.editJavaCodeForm.value)
      .subscribe(result =>{
          setTimeout(() => {
            this.location.back();
          }, 1000);  //1s
      }); 
    }
  }
}
