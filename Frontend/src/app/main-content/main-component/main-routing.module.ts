import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from 'src/app/booking/booking.component';
import { CustomerComponent } from 'src/app/customer/customer.component';
import { DriverComponent } from 'src/app/driver/driver.component';
import { HomeComponent } from 'src/app/home/home.component';
import { RoutesComponent } from 'src/app/routes/routes.component';
import { RouteActivatorService } from 'src/app/services/route-activator.service';
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

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
