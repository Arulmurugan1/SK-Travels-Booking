import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constant } from 'src/Constant';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls:['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  formData: any = FormGroup;
  hide: boolean = true;

  constructor(private form: FormBuilder, private service: LoginService,
    private snackbar: SnackbarService, private dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
    this.formData = this.form.group({
      newPassword: [null, [Validators.required,Validators.minLength(4)]],
      confirmNewPassword :[null, [Validators.required,Validators.minLength(4)]],
    })
    this.validatePassword();
  }
  validatePassword() :boolean{
    if (this.formData.controls['newPassword'].value != this.formData.controls['confirmNewPassword'].value) {
      return true;
    } else {
      return false;
    }
  }
  changePassword() {
    let data = {
      id: localStorage.getItem('userId'),
      password: this.formData.controls['newPassword'].value,
    }
    console.log(data);

    this.service.changePassword(data).subscribe({
      next: (res:any) => {
        this.dialogRef.close();
        this.snackbar.openSnackbar(res.message, "");
      },
      error: () => {
        this.dialogRef.close();
        this.snackbar.openSnackbar(Constant.SOMETHING_WRONG, "");
      },
      complete: () => {
        console.log("Change Password  Call Complete");

      }
    })

  }
}
