import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {
  message: string = '';
  eventEmitter = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any) { }

  ngOnInit(): void {
    if (this.dialogData) {
      this.message = this.dialogData;
    }
  }

  clicked() {
    this.eventEmitter.emit();
  }

}
