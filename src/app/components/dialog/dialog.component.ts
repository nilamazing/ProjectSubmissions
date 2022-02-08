import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "src/app/Entities/dialogData";

@Component({
    selector:'app-status-dialog',
    templateUrl: 'dialog.component.html'
})

export class AppStatusDialog{
    constructor(public dialogRef: MatDialogRef<AppStatusDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData){
        
    }
    closeDialog(){
        this.dialogRef.close({status:"Dialog closed"});
    }
}