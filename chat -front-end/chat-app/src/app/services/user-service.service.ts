import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:8080/api/';
  
 
  constructor(private httpClient: HttpClient) { }

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl.concat('user?username=').concat(username));
  }

  getAllActiveUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + 'active-users');

  }
  
  
}

