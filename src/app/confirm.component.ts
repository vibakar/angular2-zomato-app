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
        <div class="fr">
          <button type="button" mat-raised-button
              (click)="dialogRef.close(true)">Yes</button>
          <button type="button" mat-raised-button
              (click)="dialogRef.close(false)">No</button>
        </div>
        `,
  styles: [`.h50 {
          height: 50px;
        }
        .fr {
          float: right;
        }`]
})
export class ConfirmComponent {
  title:string;
  message:string;
  constructor(public dialogRef: MatDialogRef<ConfirmComponent>) { }
}
