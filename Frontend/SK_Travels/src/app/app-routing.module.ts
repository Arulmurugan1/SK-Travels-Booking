import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path:'' , component:LoginComponent },
  { path:'home' , component:HomeComponent },
  // {
  //   path: 'home',
  //   component:HomeComponent,
  //   children:[
  //     {
  //       path:'',
  //       redirectTo:'/home',
  //       pathMatch:'full',
  //     },
  //     {
  //       path:'customer',
  //       loadChildren : () => import('./customer/customer.component').then(m => m.CustomerComponent),
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
