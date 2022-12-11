import { Component,AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  title = environment.title;
  count: any;
  constructor(
    private homeData : LoginService) {
    this.getData();
  }
  ngAfterViewInit(): void {}

  getData(){
    this.homeData.getHomeData().subscribe({
      next: (response: any) => {
        console.log('response'+response);
        this.count = response;
      },
      error: (err: any) => {
        console.log('response err'+err);
      },
      complete: () => {
        console.log('completed home data');
      }
    })
  }
}

