import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constant } from 'src/Constant';
import { myBookingTable } from '../Interfaces/Response';
import { LoginService } from '../services/login.service';
import { SnackbarService } from '../services/snackbar.service';




@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})

export class MyBookingComponent implements AfterViewInit {

  displayedColumns = ['S.No', 'Booking No', 'Boarding', 'Destination', 'Transport No', 'Fare', 'Status', 'Booking Time', 'File Path']
  dataSource: any; tableDataSource: any;
  ;
  ;
  ;

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private Service: LoginService,
    private snackService: SnackbarService,
    private ngxService: NgxUiLoaderService) { }

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  ngAfterViewInit(): void {
    this.ngxService.start();
    this.getBookingData();
  }
  getBookingData() {
    try {
      let i = 1;
      this.Service.getBookingData().subscribe({
        next: (response: any) => {
          if (response?.message && response?.message.length > 0) {
            this.tableDataSource = response?.message;

            for (var n in response?.message) {
              this.tableDataSource[n]['S.No'] = i++;
            }

            this.dataSource = new MatTableDataSource<myBookingTable>(this.tableDataSource);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
          } else {
            this.snackService.openSnackbar('No Bookings', '');
          }
        },
        error: (res: any) => {

        }
      });
    } catch (err) {
      alert(err);
    } finally {
      this.ngxService.stop();
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
  viewPdf(booking:string,url: string) {
    try {
      this.ngxService.startBackground('loader-02');
      this.Service.getPdfData(url).subscribe({
        next: (data: Blob) => {
          var file = new Blob([data], { type: 'application/pdf' })
          var fileURL = URL.createObjectURL(file);
          open(fileURL);
        },
        error: (res: any) => {

        }
      })
    }
    catch (err) {

    } finally {
      this.ngxService.stopBackground('loader-02')
    }
  }
  getPdf(booking:string,url: string) {
    try {
      this.ngxService.startBackground('loader-02');

      this.Service.getPdfData(url).subscribe({
        next: (data: Blob) => {
          var file = new Blob([data], { type: 'application/pdf' })
          var fileURL = URL.createObjectURL(file);
          var a = document.createElement('a');
          a.href = fileURL;
          a.target = '_blank';
          a.download = booking + '_booking.pdf';
          document.body.appendChild(a);
          a.click();
        },
        error: (res: any) => {

        }
      })
    }
    catch (err) {

    } finally {
      this.ngxService.stopBackground('loader-02')
    }
  }
}
