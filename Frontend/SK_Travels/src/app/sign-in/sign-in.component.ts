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
        this.loginServices.signIn(dataForm).subscribe((response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response.message;
        this.snackbar.openSnackbar(this.responseMessage, "");
        this.router.navigate(['/home']);
        }, (error: {
          error: {
            message: any;
          };
        }) => {
        this.ngxService.stop();
        if (error.error.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = Constant.SOMETHING_WRONG;
        }
        this.snackbar.openSnackbar(this.responseMessage, Constant.ERROR)
      })
    }


}
