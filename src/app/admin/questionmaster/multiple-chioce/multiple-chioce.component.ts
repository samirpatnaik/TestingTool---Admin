import { Component,OnDestroy, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {MultiplequestionsService} from '../../../services/multiplequestions.service'
import { MultiOptionModel } from '../../../models/multiOptionModel';

@Component({
  selector: 'app-multiple-chioce',
  templateUrl: './multiple-chioce.component.html',
  styleUrls: ['./multiple-chioce.component.css']
})
export class MultipleChioceComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {

  datatableOption: DataTables.Settings = {};
  dtInstance: DataTables.Api;
  dtTrigger: Subject<any> = new Subject();
  message: any;
  questionlist:MultiOptionModel[];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(private multiplequestionService: MultiplequestionsService) { }

  ngOnInit() {

    this.datatableOption = {
      'paging'      : true,
      'lengthChange': false,
      'searching'   : true,
      'ordering'    : true,
      'info'        : true,
      'pageLength'  : 10,
      'autoWidth'   : true
    };

    this.getMultiOptionQuestionlist();
  }

  getMultiOptionQuestionlist(): void {
    this.multiplequestionService.questionlist()
      .subscribe(data => {
        this.questionlist = data;
      }
    ); 
  }

  async delete_multiquestion(rid){
    if (confirm('Are you sure to delete this question?')) {
        try {
            this.multiplequestionService.deletequestion(rid).subscribe(res => {
              if (res.length <= 0) {
                this.message = 'Something went wrong';
                setTimeout(function() {
                  this.message = false;
                }.bind(this),2000);
              } else {
                this.message = 'Question deleted successfully';
                setTimeout(function() {
                  this.getMultiOptionQuestionlist();
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
  ngAfterContentInit(): void{
    this.dtTrigger.next();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
