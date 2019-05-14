import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService
    ) { }


  ngOnInit() {
    console.log(this.authService.loggedIn());
  }

  // Logout button functionallity
  public onLogout() {
    this.authService.logout();
    this.flashMsg.show('You are now logged out', {cssClass: 'alert-success', timeout: 5000});
    // Redirect to login page
    this.router.navigate(['/login']);
    return false;
  }

}
