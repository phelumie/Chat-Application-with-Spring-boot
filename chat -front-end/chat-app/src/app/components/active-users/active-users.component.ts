import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ChatRequest } from 'src/app/model/chat-request';
import { User } from 'src/app/model/user';
import { ChatRequestService } from 'src/app/services/chat-request.service';
import { DataService } from 'src/app/services/data.service';
import { StompServiceService } from 'src/app/services/stomp-service.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  subscription!: Subscription;
  thisUser!: User;
  users:User[]=[];
  
  constructor(private route: ActivatedRoute,
    private StompServiceService:StompServiceService,
    private chatRequestService:ChatRequestService,
    private http:HttpClient,
    private dataService:DataService,
    private cdr: ChangeDetectorRef){}

 ngOnInit() {

   this.dataService.fetchUsers();
  this.thisUser= JSON.parse(sessionStorage.getItem('user')!)
  this.setUserProfilePic(this.thisUser)
  this.StompServiceService.connectUser(this.route.snapshot.paramMap.get('user')!);
  this.subscription=this.dataService.getActiveUsersSubject()
  .subscribe((users:User[])=>{
    this.users = users.filter((user, index, self) => {
      // Exclude the specific username from being added
      if (user.username === this.thisUser.username) {
        return false;
      }
      return index === self.findIndex((u) => u.username === user.username);
    });
  
    this.cdr.detectChanges();
      
  })
  

}


ngOnDestroy() {
  this.subscription.unsubscribe();
  this.dataService.eventSource.close();
}
  

  sendChatRequest(recipient: string) {
    const request:ChatRequest = {
      sender: this.thisUser.username,
      recipient: recipient,
      chatRequestStatus: "PENDING"
    };
    
     this.chatRequestService.sendChatRequest(request).subscribe();
  }
  

  private setUserProfilePic(user: User) {
    if (user.username === "kola") {
      user.propic = "assets/img/random3.png";
    } 
    else {
      user.propic = "assets/img/random2.jpg";
    }
  }
}