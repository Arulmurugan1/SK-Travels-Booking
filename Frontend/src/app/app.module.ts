import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION } from 'ngx-ui-loader';
import { SignInComponent } from './sign-in/sign-in.component';
import { TokenInterceptor } from './services/token.interceptor';
import { ChangePasswordComponent } from './main-content/change-password/change-password.component';
import { ConfirmationComponent } from './main-content/confirmation/confirmation.component';



const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "text": 'Loading...',
  "textColor": '#FFFFFF',
  "textPosition": "center-center",
  "pbColor": "red",
  "fgsColor":"red",
  "fgsType": SPINNER.squareJellyBox,
  "fgsSize": 100,
  "pbDirection": PB_DIRECTION.leftToRight,
  "pbThickness": 5,
  "bgsColor": "blue",
  "bgsOpacity": 0.5,
  "bgsPosition": "center-center",
  "bgsSize": 60,
  "bgsType": SPINNER.cubeGrid,
  "blur": 0,
  "delay": 0,
  "fastFadeOut": true,
  "fgsPosition": "center-center",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 60,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "hasProgressBar": true,
  "maxTime": -1,
  "minTime": 300
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SignInComponent,
    ChangePasswordComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
