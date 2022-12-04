import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {

  title = environment.title;
  constructor(private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {}

  signOut() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = 'Logout';
    dialogConfig.hasBackdrop = true;
    dialogConfig.enterAnimationDuration = '400ms';
    dialogConfig.exitAnimationDuration = '400ms';
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    dialogRef.componentInstance.eventEmitter.subscribe((user) => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }
  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.direction = 'ltr';
    dialogConfig.hasBackdrop = true;
    dialogConfig.enterAnimationDuration = '600ms';
    dialogConfig.exitAnimationDuration = '600ms';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }
}
