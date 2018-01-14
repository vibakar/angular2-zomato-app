import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  template: `
        <strong>{{ title }}</strong>
        <h4>{{ message }}</h4>
        <button type="button" mat-raised-button
            (click)="dialogRef.close(true)">Yes</button>
        <button type="button" mat-raised-button
            (click)="dialogRef.close(false)">No</button>
  `
})
export class ConfirmComponent {
  title:string;
  message:string;
  constructor(public dialogRef: MatDialogRef<ConfirmComponent>) { }
}
