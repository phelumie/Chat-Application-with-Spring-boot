import { Observable,Subject } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { MatDialog } from '@angular/material/dialog';
import { ChatRequestComponent } from '../components/chat-request/chat-request.component';
import { ChatRequestService } from './chat-request.service';
import { ChatRequest } from '../model/chat-request';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public eventSource: EventSource=new EventSource('http://localhost:8080/active-users/subscribe');
  private activeUsersSubject = new Subject<User[]>();
  activeUsers: User[] = [];
  thisUser:User= JSON.parse(sessionStorage.getItem('user')!)

  
  constructor(private userService:UserServiceService,
    private dialog: MatDialog,
    private router:Router,
    private snackBar: MatSnackBar,
    private chatRequestService:ChatRequestService) {
    var user:User= JSON.parse(sessionStorage.getItem('user')!)
    this.subscribeToActiveUsersUsingSse('http://localhost:8080/active-users/subscribe')
    this.chatRequestSse('http://localhost:8080/'+user.username+'/chat-request/subscribe')
  
  }
  fetchUsers() {
    this.userService.getAllActiveUsers().subscribe((users)=>{
      this.activeUsers = users;
      this.activeUsersSubject.next(users);
    
    })
    
  }
  getActiveUsersSubject(): Observable<User[]> {
    return this.activeUsersSubject;
  }  
 

subscribeToActiveUsersUsingSse(url: string) {
  const eventSource = new EventSource(url);
  eventSource.addEventListener("active-users",(event)=>{
    var eventData=JSON.parse(event.data);
    var user:User = eventData.user;
    var operation=eventData.operation;
    
    if(operation=="add"){
      if(!this.activeUsers.includes(user))
          this.activeUsers.push(user)
      this.activeUsersSubject.next(this.activeUsers)

    }
    else{
      this.activeUsers = this.activeUsers.filter(user => user.username !== user.username);
      this.activeUsersSubject.next(this.activeUsers)
    }
  })

}


chatRequestSse(url: string) {
  const eventSource = new EventSource(url);
  eventSource.addEventListener("chat-request",(event)=>{
    var eventData:ChatRequest=JSON.parse(event.data);
  
    if(eventData.chatRequestStatus==='PENDING')
      this.openChatRequestDialog(eventData.sender,eventData)
  
    if(eventData.chatRequestStatus==='ACCEPTED'){
      this.chatWithUser(eventData.sender)
    }

    if(eventData.chatRequestStatus==='DENY'){
      this.showDeclineMessage(eventData.sender)
    }
    

  
    })

}

openChatRequestDialog(userName: string,request:ChatRequest): void {
  const dialogRef = this.dialog.open(ChatRequestComponent, {
    width: '400px',
    data: { userName }
  });

  dialogRef.afterClosed().subscribe((result:string) => {

    if (result==='accepted'){
     request.chatRequestStatus='ACCEPTED';
     request.recipient=request.sender;
     request.sender=this.thisUser.username;
     this.chatRequestService.sendChatRequest(request).subscribe()
    this.chatWithUser(request.recipient)
  }

    else{
      request.chatRequestStatus='DENY';
      request.recipient=request.sender;
      request.sender=this.thisUser.username;
      this.chatRequestService.sendChatRequest(request).subscribe()
    }
  });
}



chatWithUser(username: string){
    this.router.navigate(['/chat', username ]);
  }

  private showDeclineMessage(username: string): void {
    const message = `Chat Request declined by ${username}`;
    this.snackBar.open(message, 'Dismiss', {
      duration: 4000
    });
  }

isBlank(str: string): boolean {
  return !str || !str.trim();
}

}