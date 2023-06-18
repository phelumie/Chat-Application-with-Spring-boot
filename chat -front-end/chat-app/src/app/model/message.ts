import { SafeUrl } from "@angular/platform-browser";

export class Message {
    id: string="";
    from: string="";
    to: string="";
    content: string="";
    timestamp!: Date;
    files: string[] = [];
  
  
}
