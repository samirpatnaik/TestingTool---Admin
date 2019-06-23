import { Component, OnInit } from '@angular/core';
import {JavacodeService} from '../../../services/javacode.service'
import { JavaCodeModel } from '../../../models/javaCodeModel';

@Component({
  selector: 'app-java-code',
  templateUrl: './java-code.component.html',
  styleUrls: ['./java-code.component.css']
})
export class JavaCodeComponent implements OnInit  {

  message: any;
  questionlist:JavaCodeModel[];
  
  constructor(private javacodeService: JavacodeService) { }

  ngOnInit() {
    this.getJavaCodeQuestionlist();
  }

  getJavaCodeQuestionlist(): void {
    this.javacodeService.codelist()
      .subscribe(data => {
        this.questionlist = data;
      }
    ); 
  }

  async delete_javacode(rid){
    if (confirm('Are you sure to delete this question?')) {
        try {
            this.javacodeService.deletequestion(rid).subscribe(res => {
              if (res.length <= 0) {
                this.message = 'Something went wrong';
                setTimeout(function() {
                  this.message = false;
                }.bind(this),2000);
              } else {
                this.message = 'Question deleted successfully';
                setTimeout(function() {
                  this.getJavaCodeQuestionlist();
                  this.message = false;
                }.bind(this),1000);
              }
            });
        }
        catch(err){
          return err;
        }
    }
  }


}
