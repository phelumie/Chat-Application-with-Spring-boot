import { Userdetails } from "./userdetails";

export class User {
    username: string="";
    firstName!: string;
    lastName!: string;
    gender!: string;
    favQuotes!: string;
    propic: string ='';
    id!: BigInteger;
    creationDate!: Date
    userDetails!: Userdetails
    
    
}
