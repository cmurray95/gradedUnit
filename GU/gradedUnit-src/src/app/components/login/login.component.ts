import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
// Establish fields for user profile
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    // User object to send to server
    const user = {
      username: this.username,
      password: this.password,
      email: this.email,
      name: this.name
    };

    // Authenticate user
    this.authService.signIn(user).subscribe(data => {
      if (data.success === true) {
        // User details match, start session
        this.authService.startUserSession(data.token, data.user);
        // Redirect
        this.flashMsg.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['dash']);
      } else {
        // Show error message
        this.flashMsg.show(`${data.msg} Please try again.`, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
      console.log(data);
    });
 }
}
