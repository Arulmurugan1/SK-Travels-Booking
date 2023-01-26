import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constant } from 'src/Constant';
import { LoginService } from '../services/login.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: any = FormGroup;
  responseMessage: any;
  hide = true;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginServices: LoginService,
    private snackbar: SnackbarService,
    private dialogRef: MatDialogRef<SignInComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      id: [null, [Validators.required, Validators.pattern(Constant.NAME)]],
      password: [null, [Validators.required]],
    })
  }

  Submit() {
      this.ngxService.start();
      var form = this.signInForm.value;
      var dataForm = {
        id: form.id,
        password: form.password,
      }
    this.loginServices.signIn(dataForm)

      .subscribe({
        next: (response: any) => {
          this.ngxService.stop();
          this.dialogRef.close();
          this.responseMessage = response.message;
          if (this.responseMessage)
            this.snackbar.openSnackbar(this.responseMessage, "");
          else
            this.snackbar.openSnackbar(response.status, "");

          if (response.token)
            localStorage.setItem('token', response.token);
          this.router.navigate(['/travel']);
        },
        error: (response: any) => {
          this.ngxService.stop();
          console.log('response ' + Object.keys(response));
          if (response.message) {
            this.responseMessage = response.message;
          }
          else {
            this.responseMessage = Constant.SOMETHING_WRONG;
          }
          this.snackbar.openSnackbar(this.responseMessage, Constant.ERROR)
        },
        complete: () => {
          console.log('Completed');
        }
      });
    }
}
