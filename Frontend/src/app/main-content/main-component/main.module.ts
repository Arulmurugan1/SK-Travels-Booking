import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MainComponentComponent } from './main-component.component';
import { MaterialModule } from 'src/material.module';
import { HomeComponent } from 'src/app/home/home.component';
import { AppComponent } from 'src/app/app.component';
import { BookingComponent } from 'src/app/booking/booking.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';


@NgModule({
  declarations: [
    SidenavComponent,
    MainComponentComponent,
    HomeComponent,
    BookingComponent,
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
