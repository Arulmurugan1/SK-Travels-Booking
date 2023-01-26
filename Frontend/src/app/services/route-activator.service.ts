import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from "jwt-decode";
import { Constant } from 'src/Constant';
@Injectable({
  providedIn: 'root'
})
export class RouteActivatorService {

  constructor(private router: Router,
    private auth: AuthenticationService,
    private snackbar: SnackbarService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

    let data:any = route.data;
    let role = data.expectedRole;

    const token = localStorage.getItem('token');

    var payload:any;
    if (token) {
      try {
        payload = jwt_decode(token);

      } catch (err) {
        localStorage.clear();
        this.router.navigate(['/']);
      }

      for (var name in payload)
        localStorage.setItem(name, payload[name]);

      let roleMatched = false;

      for (var i in role) {
        if (role[i] === payload.role) {
          roleMatched = true;
        }
      }

      if (payload.role == 'Admin' || payload.role == 'Guest') {
        if (this.auth.isAuthenticated() && roleMatched) {
          return true;
        }
        this.snackbar.openSnackbar('You are Unauthorized user', Constant.ERROR)
        this.router.navigate(['/travel']);
        return false;
      }
      return false;
    } else {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }

  }
}

