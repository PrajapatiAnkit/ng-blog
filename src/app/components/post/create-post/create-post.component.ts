import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  submitted: boolean = false;
  postCreatedSuccess: string = '';
  choosedFileName: string = 'Choose file';
  constructor(
    private formBuiler: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /**
     * Initialize post create form
     */
    this.createPostForm = this.formBuiler.group({
      title: ['', Validators.required],
      tags: ['', Validators.required],
      fileSource: ['', Validators.required],
      feature_image: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [feature_image] = event.target.files;
      reader.readAsDataURL(feature_image);
      reader.onload = () => {
        this.createPostForm.patchValue({
          feature_image: reader.result,
        });
        //console.log(reader.result);
        this.choosedFileName = feature_image.name;
      };
    }
  }
  /**
   * Save the user post
   */
  submitPost() {
    this.submitted = true;
    console.log(this.createPostForm.value);

    /**
     * If form is not valid, then stop here
     */
    if (!this.createPostForm.valid) {
      return;
    }

    this.postService
      .savePost(this.createPostForm.value)
      .subscribe((response) => {
        if (response.success) {
          this.postCreatedSuccess = response.message;
          setTimeout(() => {
            this.router.navigate(['/posts']);
          }, 1000);
        }
      });
  }
  /**
   * This is a helper function to get form controls
   */
  get postForm() {
    return this.createPostForm.controls;
  }
}
