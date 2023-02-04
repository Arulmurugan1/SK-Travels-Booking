import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constant } from 'src/Constant';
import { LoginService } from '../services/login.service';
import { SnackbarService } from '../services/snackbar.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginServices: LoginService,
    private snackbar: SnackbarService,
    private dialogRef: MatDialogRef<SignUpComponent>,
    private ngxService: NgxUiLoaderService) {
    }



  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(Constant.NAME)]],
      id: [null, [Validators.required, Validators.pattern(Constant.NAME)]],
      password: [null, [Validators.required]],
    })

  }

  Submit(url: string) {

      this.ngxService.start();
      var formData = this.signUpForm.value;
      var data = {
        name: formData.name,
        id: formData.id,
        password: formData.password,
      }
    this.loginServices.signUp(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response?.message;
        this.snackbar.openSnackbar(this.responseMessage, "");
      },
      error: (error: any) => {
        this.ngxService.stop();
        if (error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = Constant.SOMETHING_WRONG;
        }
        this.snackbar.openSnackbar(this.responseMessage, Constant.ERROR)
      },
    });
    }

}
