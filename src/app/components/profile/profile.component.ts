import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  submitted: boolean = false;
  profileForm: FormGroup;
  profileUpdateMsg: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    /**
     * Initialize profile form
     */
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', Validators.required],
      passwordCheck: [false, Validators.required],
    });
    this.getProfile();
  }
  get profile() {
    return this.profileForm.controls;
  }
  /**
   * This function updates user profile
   * @returns void
   */
  updateProfile(): void {
    this.submitted = true;
    console.log(this.profileForm.status);
    const profile = {
      name: this.profile.name.value,
      email: this.profile.email.value,
      contact: this.profile.contact.value,
      password: this.profile.password.value,
    };
    this.userService.updateProfile(profile).subscribe((response) => {
      this.profileUpdateMsg = response.message;
      let localData = JSON.parse(localStorage.getItem('currentUser'));
      localData.user = response.data;
      this.authService.setCurrentUser(localData);
      this.authService.logggedInUserSubject.next(localData);
      setTimeout(() => {
        this.profileUpdateMsg = '';
      }, 3000);
    });
  }
  /**
   * Get user profile
   */
  getProfile() {
    this.userService.getProfile().subscribe((response) => {
      const user = response.data;
      this.profileForm.patchValue({
        name: user.name,
        email: user.email,
        contact: user.contact,
      });
    });
  }
}
