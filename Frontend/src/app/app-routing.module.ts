import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { MainComponentComponent } from './main-content/main-component/main-component.component';
import { RouteActivatorService } from './services/route-activator.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'travel',
    component: MainComponentComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch:'full'
      },
      {
        path: '',
        loadChildren: () => import('./main-content/main-component/main.module').then(m => m.MainModule),
        canActivate:[RouteActivatorService],
          data: {
            expectedRole:['Admin','Guest']
          },
      }
    ]
  },
  { path:'**',component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
