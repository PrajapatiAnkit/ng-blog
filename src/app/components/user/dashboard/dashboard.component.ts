import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: Subscription;
  totalPost: number = 0;
  myPostCount: number = 0;
  userName: string = 'Guest';
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {
    this.user = this.authService.loggedInUser.subscribe((userData) => {
      if (userData != null) {
        this.userName = userData.user.name;
      }
    });
  }

  ngOnInit(): void {
    /**
     * Get the dashboard details on page load
     */
    this.dashboardService.getDashboard().subscribe((response) => {
      this.totalPost = response.data.post_count;
      this.myPostCount = response.data.my_post_count;
    });
  }
}
