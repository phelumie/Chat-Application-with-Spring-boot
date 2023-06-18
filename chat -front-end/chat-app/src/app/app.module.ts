import { MessageService } from './services/message.service';
import { StompServiceService } from './services/stomp-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { UserServiceService } from './services/user-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { DataService } from './services/data.service';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ChatRequestComponent } from './components/chat-request/chat-request.component';
import { ChatRequestService } from './services/chat-request.service';
import { ActiveUsersComponent } from './components/active-users/active-users.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
const stompConfig: RxStompConfig = {
  // brokerURL is your RabbitMQ endpoint
  brokerURL: 'ws://localhost:15674/ws',
  // Use your username and password for RabbitMQ
  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
  },
  debug: (str) => {
    console.log(new Date(), str);
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,
};
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    UploadDialogComponent,
    GalleryComponent,
    ChatRequestComponent,
    ActiveUsersComponent,
    SafeHtmlPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxGalleryModule,
    MatSnackBarModule
       

  ],
  providers: [UserServiceService, StompServiceService,MessageService,DataService,
    DatePipe,ChatRequestService

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
