import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationHelper } from 'src/app/helper/validations.helper';
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
  editPassword: boolean = false;
  choosedFileName: string = 'Choose file';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private validationHelper: ValidationHelper
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
      profile_pic: ['', Validators.nullValidator],
    });
    this.profileForm.get('password').disable();
    this.getProfile();
  }
  get profile() {
    return this.profileForm.controls;
  }

  onPassCheckChange(params) {
    this.editPassword = !this.editPassword;
    this.submitted = false;
    if (this.editPassword) {
      this.profileForm.get('password').enable();
    } else {
      this.profileForm.get('password').disable();
    }
  }

  /**
   * This function updates user profile
   * @returns void
   */
  updateProfile(): void {
    this.submitted = true;
    if (!this.profileForm.valid) {
      return;
    }
    this.userService.updateProfile(this.profileForm.value).subscribe(
      (response) => {
        this.profileUpdateMsg = response.message;
        let localData = JSON.parse(localStorage.getItem('currentUser'));
        localData.user = response.data;
        this.authService.setCurrentUser(localData);
        this.authService.logggedInUserSubject.next(localData);
        setTimeout(() => {
          this.profileUpdateMsg = '';
          this.choosedFileName = 'Choose file';
        }, 3000);
      },
      (errorResponse) => {
        this.validationHelper.showValidationErrors(
          this.profileForm,
          errorResponse
        );
      }
    );
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
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [profile_pic] = event.target.files;
      reader.readAsDataURL(profile_pic);

      reader.onload = () => {
        this.profileForm.patchValue({
          profile_pic: reader.result,
        });
        this.choosedFileName = profile_pic.name;
        console.log(reader.result);
      };
    }
  }
}
