import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
// Establish fields for user profile
  name: string;
  username: string;
  email: string;
  password: string;

  // Constructor takes validation service from /services/validation
  // tslint:disable-next-line: no-trailing-whitespace
  constructor(private validateService: ValidateService,
              private flashMsg: FlashMessagesService,
              private authService: AuthService,
              private router: Router
              ) {}

  ngOnInit() {}

  // Submit Sign up form
  onSignupSubmit() {
    // Create user object
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Validate form
    if(!this.validateService.validateSignup(user)){
        // Empty fields detected
        this.flashMsg.show('Please ensure all fields are filled!', {cssClass: 'alert-danger', timeout: 4000});
        return false;
    } else if(!this.validateService.validateEmail(user.email)) {
      // Invalid email
      this.flashMsg.show('Please ensure email is valid', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    // Register user
    this.authService.signUp(user).subscribe(data  => {
      if (data.success) {
        this.flashMsg.show('Account created. You may now sign up!', {cssClass: 'alert-success', timeout: 4000});
        // Redirect
        this.router.navigate(['/login']);
      } else {
        console.log(data);
        this.flashMsg.show('Error encountered. Please try again.', {cssClass: 'alert-danger', timeout: 4000});
        // Redirect
        this.router.navigate(['/signup']);
      }
    });
  }
}
