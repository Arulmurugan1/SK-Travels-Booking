import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { Constant } from 'src/Constant';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackService: SnackbarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          userid: localStorage.getItem('id') + "",
          role: localStorage.getItem('role') + "",
          username: localStorage.getItem('username') + "",
        }
      });
      return next.handle(request).pipe(
        catchError((err: any) => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 500)
              this.snackService.openSnackbar(err.error?.message, Constant.ERROR);
            else if (err.status === 401 || err.status === 403) {
              if (this.router.url === '/') {

              }
              else {
                localStorage.clear();
                this.router.navigate(['/']);
              }
            }

          }
          return throwError(() => new Error(err));
        })
      )
    }
    return next.handle(request);
  }
}
