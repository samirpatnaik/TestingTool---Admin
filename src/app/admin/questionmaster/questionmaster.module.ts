import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import {  ReactiveFormsModule } from '@angular/forms';

import { QuestionmasterRoutingModule } from './questionmaster-routing.module';
import { MultipleChioceComponent } from './multiple-chioce/multiple-chioce.component';
import { AddquestionComponent } from './multiple-chioce/addquestion/addquestion.component';
import { EditquestionComponent } from './multiple-chioce/editquestion/editquestion.component';
import { CommonfileModule} from '../commonfile/commonfile.module';
import { JavaCodeComponent } from './java-code/java-code.component';
import { AddcodeComponent } from './java-code/addcode/addcode.component';
import { EditcodeComponent } from './java-code/editcode/editcode.component';

declare var $: any;

@NgModule({
  imports: [
    CommonModule,
    QuestionmasterRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    CommonfileModule
  ],
  declarations: [MultipleChioceComponent, AddquestionComponent, EditquestionComponent, JavaCodeComponent, AddcodeComponent, EditcodeComponent]
})
export class QuestionmasterModule { }
