import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {


  @Input() 
  imageUrls: string[]=[];
  message: string = '';

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.imageUrls = data.imageUrls; 
    }
  

  onClose(): void {
    this.dialogRef.close();
  }

}
