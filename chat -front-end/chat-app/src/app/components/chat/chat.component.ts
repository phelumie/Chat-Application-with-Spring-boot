import { MessageService } from './../../services/message.service';
import { StompServiceService } from './../../services/stomp-service.service';
import { Message } from 'src/app/model/message';
import { UserServiceService } from '../../services/user-service.service';
import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user';

import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit{

  // @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined; 
  connectionEstablished= false;
  otherUser?: User;
  thisUser: User = JSON.parse(sessionStorage.getItem('user')!);
  channelName!: string;
  socket?: WebSocket;
  messages!: Observable<Array<Message>>;
  subscription!: Subscription;

  newMessage = new FormControl('');
  imageUrls: string[] = [];
  galleryOptions: NgxGalleryOptions[]=[];
  galleryImages: NgxGalleryImage[]=[];  
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private el: ElementRef,
    private stompService: StompServiceService,
    private messageService:MessageService,
    private ngZone:NgZone,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private datePipe: DatePipe) {

      this.galleryOptions = [
        {
          width: '100%',
          height: '500px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: true
        }
      ];
      this.stompService.getConnectionState().subscribe((state:boolean) => {
        this.connectionEstablished = state;
      });


    }
  ngAfterViewInit() {
    this.setUserProfilePic(this.thisUser);

    this.ngZone.run(() => {
      if (!this.connectionEstablished) {
        this.stompService.connectUser(this.thisUser.username);
        this.stompService.getConnectionState().subscribe((state: boolean) => {
          this.connectionEstablished = state;
        });
            }
    });

    this.userService
    .getUserByUsername(this.route.snapshot.paramMap.get('user')!)
    .subscribe((data) => {
      this.otherUser = data;
      this.setUserProfilePic(this.otherUser);
      this.connectToChat();
      
      console.log(this.el)
      this.el.nativeElement.querySelector("#chat").scrollIntoView();
    });
    this.messages=this.messageService.getMesssages();
    
    
    
  }

  

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  scrollDown(){
    var container = this.el.nativeElement.querySelector("#chat");
    container.scrollTop = container.scrollHeight;
  }

  // Handle file upload logic 
  uploadImages(event: any) {
    const fileInput = event.target as HTMLInputElement;
  
    if (fileInput.files && fileInput.files.length > 0) {
      const files = Array.from(fileInput.files);
      const fileReaders: Promise<void>[] = [];
  
      files.forEach((file: File) => {
        const fileReader = new FileReader();
        const fileReaderPromise = new Promise<void>((resolve) => {
          fileReader.onload = (e) => {
            if (e.target) {
              const dataUrl = e.target.result as string;
  
              this.imageUrls.push(dataUrl);
            }
            resolve();
          };
        });
  
        fileReaders.push(fileReaderPromise);
        fileReader.readAsDataURL(file);
      });
  
      Promise.all(fileReaders).then(() => {
        this.openImageDialog();
      });
    }
  }
  
  
  connectToChat() {

    const id1 = this.thisUser.id!;
    const nick1 = this.thisUser.username;
    const id2 = this.otherUser?.id!;
    const nick2 = this.otherUser?.username!;

    let sortedChannelNames = [nick1, nick2].sort();
    this.channelName = sortedChannelNames[0] +'&' + sortedChannelNames[1];

    // to implementt loadchat and render messages
    this.messageService.loadChat(this.channelName)
    
    this.stompService.chatSubscribe(this.channelName,this.thisUser.username,this.otherUser!.username);  
  
  }
  

     sendMsg() {
    const message: Message = {
      content: this.newMessage.value!.trim(),
      files: this.imageUrls,
      timestamp: new Date(),
      from: this.thisUser.username,
      to: this.otherUser!.username,
      id: ''
    };

  
    this.stompService.sendMsg(message,this.channelName)    

    this.newMessage.reset();
    this.imageUrls = [];
  }
    

  showGallery(image: SafeUrl) {
    this.dialog.open(GalleryComponent, {
      width: '500px',
      height: '500px',
      // width: '100vw',
      // height: '100vh',
      data: { images: [image] }
    });
  }
  openImageDialog(): void {
 
    // Open a dialog to display the image
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '500px',
      // width: 'auto',
      data: { imageUrls: this.imageUrls }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Do something with the dialog result
      console.log('Dialog closed with result:', result);
    
     
      if(result!=null){
        
        this.newMessage.setValue(result.message);
        this.sendMsg();
      }
    
    });


  }
  
  
  
  
  whenWasItPublished(timeStamp: Date) {
    return this.datePipe.transform(timeStamp, 'hh:mm');
  }
  private setUserProfilePic(user: User) {
    if (user.username === "kola") {
      user.propic = "assets/img/random2.jpg";
    } 
    else {
      user.propic = "assets/img/random3.png";
    }
  }

}


