import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public currentUserSubscription$: Subscription;
  currentUser: any;
  currentUserName: string;
  currentUserProfile: string;
  isLoggedIn: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.currentUserSubscription$ = this.authService.loggedInUser.subscribe(
      (user) => {
        if (user != null) {
          this.currentUser = user;
          this.currentUserName = this.currentUser.user.name;
          this.isLoggedIn = this.authService.isLoggedIn;
          this.currentUserProfile = this.currentUser.user.profile_pic;
          console.log('loggedin user', this.currentUser);
          console.log('loggedin status', this.isLoggedIn);
          console.log('profile pic', this.currentUserProfile);
        } else {
          this.isLoggedIn = false;
        }
      }
    );
  }

  ngOnInit(): void {}
}
