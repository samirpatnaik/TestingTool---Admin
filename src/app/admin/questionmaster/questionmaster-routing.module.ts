import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuardService} from '../../services/auth-guard.service';
import {MultipleChioceComponent} from '../questionmaster/multiple-chioce/multiple-chioce.component';
import {AddquestionComponent} from '../questionmaster/multiple-chioce/addquestion/addquestion.component';
import {EditquestionComponent} from '../questionmaster/multiple-chioce/editquestion/editquestion.component';

import {JavaCodeComponent} from '../questionmaster/java-code/java-code.component';
import {AddcodeComponent} from '../questionmaster/java-code/addcode/addcode.component';
import {EditcodeComponent} from '../questionmaster/java-code/editcode/editcode.component';


const routes: Routes = [
  {
    path: 'multioption',
    component: MultipleChioceComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'multioption/addnewquestion',
    component: AddquestionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'multioption/editquestion/:id',
    component: EditquestionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'codeoption',
    component: JavaCodeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'codeoption/addnewquestion',
    component: AddcodeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'codeoption/editquestion/:id',
    component: EditcodeComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionmasterRoutingModule { }
