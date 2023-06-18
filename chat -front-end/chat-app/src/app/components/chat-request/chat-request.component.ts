import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-request',
  templateUrl: './chat-request.component.html',
  styleUrls: ['./chat-request.component.css']
})
export class ChatRequestComponent {
  senderName: string;


  constructor(
    public dialogRef: MatDialogRef<ChatRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Retrieve the sender name using the userId from the data object
    this.senderName = data.userName;
  }

  acceptRequest(): void {
    // Handle the acceptance logic
    this.dialogRef.close('accepted');
  }

  denyRequest(): void {
    // Handle the denial logic
    this.dialogRef.close('denied');
  }


}
