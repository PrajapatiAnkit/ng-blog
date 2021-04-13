import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.logggedInUserSubject.subscribe((user) => {
      if (user == null) {
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit(): void {
    this.authService.logout().subscribe((response) => {
      console.log(response);
      this.router.navigate(['']);
    });
  }
}
