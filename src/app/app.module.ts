import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { BookingComponent } from './booking/booking.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DriverComponent } from './driver/driver.component';
import { RoutesComponent } from './routes/routes.component';

import {MaterialExampleModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION } from 'ngx-ui-loader';
import { SignInComponent } from './sign-in/sign-in.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: '#FFFFFF',
  textPosition: "center-center",
  pbColor: "red",
  bgsColor: "red",
  fgsColor:"red",
  fgsType: SPINNER.squareJellyBox,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness:5
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerComponent,
    BookingComponent,
    VehicleComponent,
    DriverComponent,
    RoutesComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    SignInComponent
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
    MaterialExampleModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
