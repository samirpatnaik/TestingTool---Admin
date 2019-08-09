import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';

import { Routing } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonfileModule} from './commonfile/commonfile.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserdetailsComponent } from './userlist/userdetails/userdetails.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    Routing,
    CommonfileModule,
    ReactiveFormsModule
  ],
  declarations: [ AdminComponent, DashboardComponent, ChangepasswordComponent, UserlistComponent, UserdetailsComponent]
})
export class AdminModule { }
