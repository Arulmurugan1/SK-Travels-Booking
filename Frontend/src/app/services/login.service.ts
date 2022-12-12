import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  signUp(data: any) {
    localStorage.clear();
    return this.httpClient.post(this.url + '/login/register', data, {
      headers: new HttpHeaders().set('ContentType', "application/json")
    })
  }

  signIn(data: any) {
    localStorage.clear();
    return this.httpClient.post(this.url +'/login/', data, {
      headers: new HttpHeaders().set('ContentType', "application/json")
    })
  }
  checkToken() {
    return this.httpClient.get(this.url + '/checkToken');
  }
  getHomeData() {
    return this.httpClient.get(this.url + '/home');
  }
  changePassword(data:any) {
    return this.httpClient.post(this.url + '/login/changePassword', data, {
      headers: new HttpHeaders().set('ContentType', 'application/json')
    });
  }
  getBoarding(): any {
    return this.httpClient.get(this.url + '/booking/getBoarding');
  }
  getDestination() :any{
    return this.httpClient.get(this.url + '/booking/getDestination');
  }
  getDetails(data:any){
    return this.httpClient.post(this.url + '/booking/details', data, {
      headers: new HttpHeaders().set('ContentType', 'application/json')
    });
  }
  BookData(data: any) : Observable<Blob>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json', responseType: 'blob'
    });

    return this.httpClient.post<Blob>(this.url + '/booking/insert', data, {
      headers: headers, responseType: 'blob' as 'json'
    });
  }
}
