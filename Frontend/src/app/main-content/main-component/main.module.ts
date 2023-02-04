import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MainComponentComponent } from './main-component.component';
import { MaterialModule } from 'src/material.module';
import { HomeComponent } from 'src/app/home/home.component';
import { AppComponent } from 'src/app/app.component';
import { MyBookingComponent } from 'src/app/my-booking/my-booking.component';
import { BookingComponent } from 'src/app/booking/booking.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { UsersComponent } from 'src/app/users/users.component';


@NgModule({
  declarations: [
    SidenavComponent,
    MainComponentComponent,
    HomeComponent,
    BookingComponent,
    MyBookingComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule

  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'warn' },
    }
  ]
})
export class MainModule {
  static NgxUiLoaderModule: any;
}
