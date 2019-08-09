import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {RegisterUsereModel} from  '../models/registerUserModel';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private _http:HttpClient) { }
 

  login(body:any){
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  updatepwd(body:any){
    return this._http.post('http://127.0.0.1:3000/users/updatepassword',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  logout(){
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  /* Register candidates list*/    

  registeruserlist(): Observable<RegisterUsereModel[]>{
    return this._http.get<RegisterUsereModel[]>('http://127.0.0.1:3000/registerusers/userslist',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  registeruserByID(rid: any){
    return this._http.get('http://127.0.0.1:3000/registerusers/userdetails/'+`${rid}`,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  deleteuser(usernmodel : RegisterUsereModel | string): Observable<RegisterUsereModel>{
    const id = typeof usernmodel === 'string' ? usernmodel : usernmodel._id;

    return this._http.delete<RegisterUsereModel>('http://127.0.0.1:3000/registerusers/deleteuser/'+`${id}`,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }


}
