import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  // Create user object
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Retrieve profile
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    // Output error if present
    err => {
      console.log(err);
      return false;
    });
    }

    // Detect file added
  }


