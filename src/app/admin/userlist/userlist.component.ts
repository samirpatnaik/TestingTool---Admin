import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { RegisterUsereModel } from '../../models/registerUserModel';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  message: any;
  userlist:RegisterUsereModel[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getRegisteredUserList();
  }

  getRegisteredUserList(): void {
    this.userService.registeruserlist()
      .subscribe(data => {
        this.userlist = data;
      }
    ); 
  }

  async delete_user(rid){
    if (confirm('Are you sure to delete this candidate?')) {
        try {
            this.userService.deleteuser(rid).subscribe(res => {
              if (res.length <= 0) {
                this.message = 'Something went wrong';
                setTimeout(function() {
                  this.message = false;
                }.bind(this),2000);
              } else {
                this.message = 'User deleted successfully';
                setTimeout(function() {
                  this.getRegisteredUserList();
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
