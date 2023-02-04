import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { responseType,myBookingTable, UserTable } from '../Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  url = environment.baseUrl;

  userId = localStorage.getItem('id');

  HeaderJSonType = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private httpClient: HttpClient) {
    console.log(this.HeaderJSonType.headers);
   }



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
  BookData(data: any,fileName:string) : Observable<Blob>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json', responseType: 'blob',filename:fileName
    });

    return this.httpClient.post<Blob>(this.url + '/booking/insert', data, {
      headers: headers, responseType: 'blob' as 'json'
    });
  }

  getBookingData():any
  {
    return this.httpClient.post<myBookingTable>(this.url + '/booking/MyBooking',this.HeaderJSonType);
  }
  getUserData():any
  {
    return this.httpClient.get<UserTable>(this.url + '/login/getDetails');
  }
  updateStatus(data : any): any
  {
    return this.httpClient.post<responseType>(this.url + "/login/status",data,this.HeaderJSonType);
  }
  getPdfData(url: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', responseType: 'blob',filename:url
    });

    return this.httpClient.post<Blob>(this.url + '/booking/getPdf',{}, {
      headers: headers, responseType: 'blob' as 'json'
    });
  }
}
