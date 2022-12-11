import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  tableData: any;
  i = 0;
  bookingForm: any = FormGroup;
  from: any;to: any;
  details: any; driver: any; driverName: any; vehicle: any; fare:any;

  constructor(private formBuilder: FormBuilder, private service: LoginService,
  private ngxService:NgxUiLoaderService) {

    this.tableData = [];

    this.bookingForm = this.formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      date: ['', [Validators.required]],
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      fare: [this.fare, []],
      driver: [this.driver, []],
      driverName : [this.driverName, []],
      vehicle: [this.vehicle, []],
    });
  }

  getDetails() {

    if (this.bookingForm.value['start']
      && this.bookingForm.value['end']
      && this.bookingForm.value['start'] != ''
      && this.bookingForm.value['end'] != '') {

      this.service.getDetails(this.bookingForm.value).subscribe({
        next: (res: any) => {
          if (res?.result) {
            this.vehicle = res.result.vehicle_no;
            this.driver = res.result.driver_id;
            this.driverName=res.result.driver_name;
            this.fare = res.result.fare;

          }
          return res;
        },
        error: (err: any) => {
          return err?.message;
        },
        complete: () => {
          console.log(this.bookingForm.value);
        }
      });
    }
  }

  ngOnInit(): void {

    this.from = this.service.getBoarding().subscribe({
      next: (response: any) => {
        console.log('response' + response);
        this.from = response;
      },
      error: (err: any) => {
        console.log('response err' + err);
      },
      complete: () => {
        console.log('completed home data');
      }
    });
    this.to = this.service.getDestination().subscribe({
      next: (response: any) => {
        console.log('response' + response);
        this.to = response;
      },
      error: (err: any) => {
        console.log('response err' + err);
      },
      complete: () => {
        console.log('completed home data');
      }
    });

  }

  add() {
    var data            = this.bookingForm.value;
    data['fare']        = this.fare;
    data['driver']      = this.driver;
    data['driverName']  = this.driverName;
    data['vehicle']     = this.vehicle;
    data['id']          = localStorage.getItem('userId');

    this.tableData.push(data);
    this.i++;

    console.log(this.tableData);
    this.bookingForm.reset();
  }

  reset() {
    this.bookingForm.reset();
  }
  clear() {
    this.tableData = [];
  }

  BookData() {

    if (this.tableData.length > 0)
    {
      this.service.BookData(this.tableData).subscribe({
        next: (response: any) => {
          saveAs(response, 'BookingDetails.pdf');
        },
        error: (res) => {
          console.log(res);
        }
      });
    }
  }

}

