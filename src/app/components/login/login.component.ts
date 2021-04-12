import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loggingIn: boolean = false;
  loginFailed: boolean;
  loginFailedMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private authServive: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /**
     * Initialize login form
     */
    this.authServive.removeToken();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  /**
   * This function performs user login
   * @returns void
   */
  login(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loggingIn = true;
    this.loginFailed = false;
    const credentials = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };
    this.authServive.login(credentials.email, credentials.password).subscribe(
      (response) => {
        if (response.success) {
          this.loginFailed = false;
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.loginFailed = true;
          this.loginFailedMessage = response.message;
        }
        this.loggingIn = false;
      },
      (error) => {
        this.loggingIn = false;
        this.loginFailed = true;
        this.loginFailedMessage = 'Something went wrong...';
      }
    );
    this.submitted = false;
  }
  get frm() {
    return this.loginForm.controls;
  }
}
