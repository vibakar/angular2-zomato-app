import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AlertComponent } from '../alert.component';
import { ConfirmComponent } from '../confirm.component';

@Injectable()
export class DialogsService {

    constructor(private dialog: MatDialog) { }

    public alert(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<AlertComponent>;

        dialogRef = this.dialog.open(AlertComponent,{
        	height:'200px',
        	width:'450px'
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmComponent>;

        dialogRef = this.dialog.open(ConfirmComponent,{
        	height:'200px',
        	width:'450px'
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
