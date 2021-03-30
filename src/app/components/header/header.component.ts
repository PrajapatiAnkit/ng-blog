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
  isLoggedIn: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.currentUserSubscription$ = this.authService.loggedInUser.subscribe(
      (user) => {
        if (user != null) {
          this.currentUser = user;
          this.currentUserName = this.currentUser.user.name;
          this.isLoggedIn = this.authService.isLoggedIn;
          console.log('loggedin user', this.currentUser);
          console.log('loggedin status', this.isLoggedIn);
        } else {
          this.currentUserName = 'Guest';
          this.isLoggedIn = false;
        }
      }
    );
  }

  ngOnInit(): void {}
}
