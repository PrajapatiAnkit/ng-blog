import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupSuccessMessage: string;
  signupForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  /**
   * This function registers the new users
   * @returns void
   */
  signup(): void {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.signUp(this.signupForm.value).subscribe((response) => {
      if (response.success) {
        this.signupSuccessMessage = response.message;
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1000);
      }
    });
  }
  get signupFrm() {
    return this.signupForm.controls;
  }
}
