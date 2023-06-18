import { UserServiceService } from './../../services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatRequestService } from 'src/app/services/chat-request.service';

export const LOGIN_ERROR_MESSAGE = 'Invalid username or password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginForm!: FormGroup;
  errorMessage!: string;
  
  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService:UserServiceService){}


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    // validate the form values
    if (this.loginForm.invalid) {
      return;
    }
  
    const user = this.loginForm.value.username;
    this.userService.getUserByUsername(user).subscribe((data)=>{
      if(data!=null){
        sessionStorage.setItem('user',JSON.stringify(data));
        // redirect to the next page and pass the user information as a route parameter
        this.router.navigate(['/active-users', { user }]);      
      }
      else{
        this.errorMessage = 'Invalid username or password';

      }
    }, error => {
      
            })
    

  }

}
