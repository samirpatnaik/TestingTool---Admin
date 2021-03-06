import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {UserlistComponent} from './userlist/userlist.component';
import {UserdetailsComponent} from './userlist/userdetails/userdetails.component';

import {AuthGuardService} from '../services/auth-guard.service';


const routes: Routes = [
  {
      path: '', component: AdminComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },
        {
          path: 'dashboard',
          component: DashboardComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'changepassword',
          component: ChangepasswordComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'userslist',
          component: UserlistComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'userslist/userdetails/:id',
          component: UserdetailsComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'questionmaster',
          loadChildren: './questionmaster/questionmaster.module#QuestionmasterModule',
          canActivate: [AuthGuardService]
        }
     ]  
  }
];


export const Routing: ModuleWithProviders = RouterModule.forChild(routes);