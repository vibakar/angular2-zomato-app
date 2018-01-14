import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  template: `
  		<div class="h50">
         <strong>{{ title }}</strong>
        </div>
        <div class="h50">
        <h4>{{ message }}</h4>
        </div>
        <div>
        <button type="button" class="pull-right" mat-raised-button
            (click)="dialogRef.close(true)">Ok</button>
        </div>
        `,
        styles: [`.h50 {
        	height: 50px;
        }`]
})
export class AlertComponent {
  title:string;
  message:string;
  constructor(public dialogRef: MatDialogRef<AlertComponent>) { }
}
