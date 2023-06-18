import { Message } from 'src/app/model/message';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class StompServiceService {

  private connectionState = new Subject<boolean>();
  thisUser: User = JSON.parse(sessionStorage.getItem('user')!);


  private url = 'http://localhost:8080';
  socket = new SockJS(this.url);
  stompClient = Stomp.over(this.socket);

  constructor(private messageService:MessageService){
    this.socket = new SockJS(this.url + '/chat?token='+this.thisUser.username);
    this.stompClient = Stomp.over(this.socket);
    
     }
  

  connectUser(token: string){
    console.log('connecting to chat...');
    this.stompClient .connect({token: "abc123"},  (frame) => {
      console.log('Connected: ' + frame);
      this.connectionState.next(true);

    });    
  }
    chatSubscribe(channelName: string,thisUser:string,otherUser:string){
      
      this.stompClient.connect({}, (frame) => {
        //func = what to do when connection is established
        console.log('connected to: ' + frame);
        this.stompClient!.subscribe(
          '/topic/messages/' + channelName,
          (response) => {
            const msg:Message=JSON.parse(response.body);
            //func = what to do when client receives data (messages)
            this.messageService.addChats(msg);
            
          }
        );
      });

    }
    
sendMsg(msg:Message,channelName:string){

  this.stompClient.send(
    '/ws/chat/' + channelName,
    {token:msg.from},
    JSON.stringify(msg)  
  );  

}

    getConnectionState(): Observable<boolean> {
      return this.connectionState.asObservable();
    }
}
