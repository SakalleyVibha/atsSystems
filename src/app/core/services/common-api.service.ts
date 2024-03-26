import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  baseUrl:string = environment.base_URL
  userValid:boolean = false
  
  constructor(private http:HttpClient) {}

  isLoggedIn(){
    return this.userValid
  }

  allPostMethod(endpoint:string,data:any){
    return this.http.post(`${this.baseUrl}/${endpoint}`,data)
  }
}