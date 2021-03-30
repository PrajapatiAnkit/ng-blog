import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error: string;
  constructor(
    private formBuilder: FormBuilder,
    private authServive: AuthService,
    private router: Router
  ) {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const credentials = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };
    //console.log(credentials);
    this.authServive
      .login(credentials.email, credentials.password)
      .subscribe((response) => {
        if (response.success) {
          //console.log(response.data);
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/products']);
        } else {
          this.error = 'Login failed';
        }
      });
  }
  get frm() {
    return this.loginForm.controls;
  }
}
