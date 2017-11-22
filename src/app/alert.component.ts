import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  template: `
        <strong>{{ title }}</strong>
        <h4>{{ message }}</h4>
        `
})
export class AlertComponent {
  title:string;
  message:string;
  constructor(public dialogRef: MatDialogRef<AlertComponent>) { }
}
