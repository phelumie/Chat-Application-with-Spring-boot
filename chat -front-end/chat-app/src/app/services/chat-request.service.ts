import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRequest } from '../model/chat-request';

@Injectable({
  providedIn: 'root'
})
export class ChatRequestService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private httpClient:HttpClient) { }

  sendChatRequest(request: ChatRequest):Observable<any> {
    const url = `${this.baseUrl}api/chat/request`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
  'Connection':'keep-alive','Accept':'*/*' });
 
     return this.httpClient.post(url, request)
  }

}
