import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  baseUrl:string = environment?.base_URL

  constructor(private http:HttpClient) { }

  getData(endpoint:string,data:any){
    return this.http.post(`${this.baseUrl}/${endpoint}`,data);
  }

}