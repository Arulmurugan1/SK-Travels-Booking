import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'src/Constant';
import { MyBookingTable } from '../Interfaces/myBookingTable';
import { LoginService } from '../services/login.service';
import { SnackbarService } from '../services/snackbar.service';




@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})

export class MyBookingComponent implements OnInit
{

  displayedColumns = ['Boarding', 'Destination', 'Transport No', 'Fare', 'Status', 'Booking Time']
  dataSource   : any ;

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private Service: LoginService,
    private snackService : SnackbarService ) { }

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  ngOnInit(): void
  {

    this.getBookingData();
  }

  getBookingData()
  {
    try {
      this.Service.getBookingData().subscribe({
        next: (response: any) => {
          if (response) {
            this.dataSource = new MatTableDataSource<MyBookingTable>(response?.result);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
          } else {
            this.snackService.openSnackbar("No Booking Found", " ");
          }
        },
        error: (res: any) => {
          this.snackService.openSnackbar('Something Went Wrong', Constant.ERROR);
        },
        complete: () => {
          console.log('Completed');
        }
      });
    } catch (err) {
      alert(err);
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }
    else {
      this._liveAnnouncer.announce(' Sorting Cleared');
    }
  }


}
