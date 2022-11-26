import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { CustomerComponent } from './customer/customer.component';
import { DriverComponent } from './driver/driver.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RoutesComponent } from './routes/routes.component';
import { VehicleComponent } from './vehicle/vehicle.component';

const routes: Routes = [
  {path: '',            component: AppComponent},
  {path: 'home',        component: HomeComponent},
  {path: 'booking',     component: BookingComponent},
  {path: 'customer',    component: CustomerComponent},
  {path: 'vehicle',     component: VehicleComponent},
  {path: 'driver',      component: DriverComponent},
  {path: 'route',       component: RoutesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
