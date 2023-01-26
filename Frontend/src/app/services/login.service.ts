import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.baseUrl;

  userId = localStorage.getItem('id');

  httpHeaders = new HttpHeaders();

  HeaderJSonType = {
    headers: this.httpHeaders.set('ContentType', "application/json").set('userid', this.userId + "")
    .set('role',localStorage.getItem('role')+"")
  };
  constructor(private httpClient: HttpClient) { }



  signUp(data: any) {
    localStorage.clear();
    return this.httpClient.post(this.url + '/login/register', data, )
  }

  signIn(data: any) {
    localStorage.clear();
    return this.httpClient.post(this.url +'/login/', data, this.HeaderJSonType )
  }
  checkToken() {
    return this.httpClient.get(this.url + '/checkToken');
  }
  getHomeData() {
    return this.httpClient.get(this.url + '/home',this.HeaderJSonType);
  }
  changePassword(data:any) {
    return this.httpClient.post(this.url + '/login/changePassword', data, this.HeaderJSonType);
  }
  getBoarding(): any {
    return this.httpClient.get(this.url + '/booking/getBoarding');
  }
  getDestination(start: string): any{
    return this.httpClient.get(this.url + '/booking/getDestination/'+start);
  }
  getDetails(data:any){
    return this.httpClient.post(this.url + '/booking/details', data, this.HeaderJSonType );
  }
  BookData(data: any) : Observable<Blob>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json', responseType: 'blob'
    });

    return this.httpClient.post<Blob>(this.url + '/booking/insert', data, {
      headers: headers, responseType: 'blob' as 'json'
    });
  }

  getBookingData():any
  {
    return this.httpClient.post(this.url + '/booking/MyBooking', { 'userId': this.userId },this.HeaderJSonType);
  }
}
