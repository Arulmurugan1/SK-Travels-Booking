import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constant } from 'src/Constant';
import { UserTable } from '../Interfaces/Response';
import { LoginService } from '../services/login.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  Columns = ['User Id', 'User Name', 'Password', 'Gender', 'Role', 'Altered User',
    'Create Time', 'Last Login','Date Of Birth', 'Status'];

  data: any;

  @ViewChild(MatSort) sorting: MatSort | any;
  @ViewChild(MatPaginator) paging: MatPaginator | any;

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private service: LoginService,
    private snackbar: SnackbarService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {

    this.ngxService.start();

    this.service.getUserData().subscribe({
      next: (response: any) => {
        if (response) {
          this.data = new MatTableDataSource<UserTable>(response?.message);
          this.data.sort = this.sorting;
          this.data.paginator = this.paging;
        } else {
          this.snackbar.openSnackbar('Something Went wrong', Constant.ERROR);
        }
      },
      error: (res: any) => {
        this.snackbar.openSnackbar(res, Constant.ERROR);
      },
      complete: () => {
        this.ngxService.stop();
      }

    });

  }

  applySorting(sortState :Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce(`Sorted Cleared`);
    }
  }

  action(status: any, user_id: string) {
    this.ngxService.startBackground();
    let data = {
      status: status === true ? 'Y' : 'N',
      id : user_id
    }

    this.service.updateStatus(data).subscribe({
      next: (response: any) => {
          this.snackbar.openSnackbar(response?.message,'');
      },
      error: (res: any) => {
        this.snackbar.openSnackbar(res?.message,Constant.ERROR);
      },
      complete: () => {
        this.ngxService.stopBackground();
      }
    })
  }
}
