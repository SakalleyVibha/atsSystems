import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  userValid: boolean = false;

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return this.userValid;
  }

  allPostMethod(endpoint: string, data: any) {
    return this.http.post(`${environment.base_URL}/${endpoint}`, data);
  }

  allgetMethod(endpoint: string) {
    return this.http.get(`${environment.base_URL}/${endpoint}`);
  }
}