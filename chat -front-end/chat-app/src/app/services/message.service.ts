import { HttpClient } from '@angular/common/http';
import { UserServiceService } from './user-service.service';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8080/api/';
  private messageArray:Array<Message>=[]

  private messages =new Subject<Message[]>();;

  constructor(private http:HttpClient) { }
  



  loadChat(channel:string){
    this.loadMessages(channel).subscribe(msg=>{  
      this.messageArray=msg;

      this.messages.next(this.messageArray);

    
    })
   }

   addChats(msg:Message){
    this.messageArray.push(msg);
    this.messages.next(this.messageArray);
   }

   

   getMesssages():Observable<Array<Message>>{
    return this.messages;
   }

   private loadMessages(channel :string):Observable<Array<Message>>{
    return this.http
    .get<Array<Message>>(this.baseUrl+'chats/'+channel);
  }
}
