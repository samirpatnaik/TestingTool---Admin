import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(private userService: UserService, private _router:ActivatedRoute) { }

  ngOnInit() {
    this.userService.registeruserByID(this._router.snapshot.paramMap.get('id')).subscribe(
        qinfo =>{
          console.log(qinfo)
        });
  }

}
