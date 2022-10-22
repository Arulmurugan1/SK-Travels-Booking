import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  signUp(data: any) {
    return this.httpClient.post(this.url + '/login/register', data, {
      headers: new HttpHeaders().set('ContentType', "application/json")
    })
  }

  signIn(data: any) {
    return this.httpClient.post(this.url +'/login/', data, {
      headers: new HttpHeaders().set('ContentType', "application/json")
    })
}
}
