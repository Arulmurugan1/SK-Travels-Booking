import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
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
  from : any; to :any;
  details: any; driver: any; driverName: any; vehicle: any; fare: any;
  isLinear = true; // For Disable Confirm Booking icon
  role = localStorage.getItem('role');

  constructor(private formBuilder: FormBuilder, private service: LoginService,
  private ngxService:NgxUiLoaderService) {

    this.tableData = [];

    this.ngxService.start();

    this.bookingForm = this.formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.maxLength(10)]],
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
        this.ngxService.stop();
      }
    });



  }

  getDestination() {
    if (this.bookingForm.value['start'] != '')
    {
      this.to = this.service.getDestination(this.bookingForm.value['start']).subscribe({
        next: (response: any) => {
          this.to = response?.results;
        },
        error: (err: any) => {
          console.log('response err' + err);
        },
        complete: () => {
          console.log('completed home data');
        }
      });
    }
  }

  add() {
    var data = this.bookingForm.value;
    data['date']        = data['date'].toLocaleDateString();
    data['fare']        = this.fare;
    data['driver']      = this.driver;
    data['driverName']  = this.driverName;
    data['vehicle']     = this.vehicle;
    data['id']          = localStorage.getItem('userId');

    this.tableData.push(data);
    this.i++;
    this.isLinear = false;
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
      this.ngxService.start();

      this.service.BookData(this.tableData,new Date().getTime() +'_booking.pdf').subscribe({
        next: (data: Blob) => {
          var file = new Blob([data], { type: 'application/pdf' })
          var fileURL = URL.createObjectURL(file);
          this.tableData = [];
          window.open(fileURL); // To open the file document
          this.ngxService.stop();
          var a         = document.createElement('a');
          a.href        = fileURL;
          a.target      = '_blank';
          // a.download    = this.fileName; To download the document
          document.body.appendChild(a);
          // a.click(); To open the file document
        },
        error: (res:any) => {
          this.ngxService.stop();
          alert(res?.message);
        }
      });
    }
  }

}

