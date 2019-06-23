import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JavaCodeModel} from  '../models/javaCodeModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class JavacodeService {

  constructor(private _http:HttpClient) { }

  codelist(): Observable<JavaCodeModel[]>{
    return this._http.get<JavaCodeModel[]>('http://127.0.0.1:3000/javacode/dashboard',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  addnewquestion(body:any){
    return this._http.post('http://127.0.0.1:3000/javacode/addnewcodequestion',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getQuestionByID(rid: any): Observable<JavaCodeModel>{
    return this._http.get<JavaCodeModel>('http://127.0.0.1:3000/javacode/editcodequestion/'+`${rid}`,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  updatequestion(body:any){
    return this._http.post('http://127.0.0.1:3000/javacode/updatecodequestion',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  deletequestion(multioptionmodel : JavaCodeModel | string): Observable<JavaCodeModel>{
    const id = typeof multioptionmodel === 'string' ? multioptionmodel : multioptionmodel._id;

    return this._http.delete<JavaCodeModel>('http://127.0.0.1:3000/javacode/deletecodequestion/'+`${id}`,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

}
