import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from 'src/app/booking/booking.component';
import { CustomerComponent } from 'src/app/customer/customer.component';
import { DriverComponent } from 'src/app/driver/driver.component';
import { HomeComponent } from 'src/app/home/home.component';
import { MyBookingComponent } from 'src/app/my-booking/my-booking.component';
import { RoutesComponent } from 'src/app/routes/routes.component';
import { UsersComponent } from 'src/app/users/users.component';
import { VehicleComponent } from 'src/app/vehicle/vehicle.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'transport',
    component: VehicleComponent,
  },
  {
    path: 'driver',
    component: DriverComponent,

  },
  {
    path: 'route',
    component: RoutesComponent,

  },
  {
    path: 'myBooking',
    component:MyBookingComponent
  },
  {
    path: 'userDetails',
    component:UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
