import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MultiOptionModel} from  '../models/multiOptionModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiplequestionsService {

  constructor(private _http:HttpClient) { }

  questionlist(): Observable<MultiOptionModel[]>{
    return this._http.get<MultiOptionModel[]>('http://127.0.0.1:3000/multioption/dashboard',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  addnewquestion(body:any){
    return this._http.post('http://127.0.0.1:3000/multioption/addnewmultiquestion',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getQuestionByID(rid: any): Observable<MultiOptionModel>{
    return this._http.get<MultiOptionModel>('http://127.0.0.1:3000/multioption/editmultiquestion/'+`${rid}`,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  updatequestion(body:any){
    return this._http.post('http://127.0.0.1:3000/multioption/updatemultiquestion',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  deletequestion(multioptionmodel : MultiOptionModel | string): Observable<MultiOptionModel>{
    const id = typeof multioptionmodel === 'string' ? multioptionmodel : multioptionmodel._id;

    return this._http.delete<MultiOptionModel>('http://127.0.0.1:3000/multioption/deletemultiquestion/'+`${id}`,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
}
