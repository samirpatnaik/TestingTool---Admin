import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html'
})
export class SidemenuComponent implements OnInit {

  constructor(private _user:UserService, private _router:Router, private session: SessionStorageService) { }

  ngOnInit() {
  }

  logout(){
    this.session.remove('currentUser');

    this._user.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/admin'])},
      error=>console.error(error)
    )
  }

}
