import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MainComponentComponent } from './main-component.component';
import { MaterialModule } from 'src/material.module';
import { HomeComponent } from 'src/app/home/home.component';
import { AppComponent } from 'src/app/app.component';


@NgModule({
  declarations: [
    SidenavComponent,
    MainComponentComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
  ],
  bootstrap:[AppComponent]
})
export class MainModule { }
