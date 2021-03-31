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
      postTitle: ['', Validators.required],
      postTags: ['', Validators.required],
      postContent: ['', Validators.required],
    });
  }
  /**
   * Save the user post
   */
  submitPost() {
    this.submitted = true;
    /**
     * If form is not valid, then stop here
     */
    if (!this.createPostForm.valid) {
      return;
    }
    const postData = {
      title: this.postForm.postTitle.value,
      tags: this.postForm.postTags.value,
      content: this.postForm.postContent.value,
    };
    this.postService.savePost(postData).subscribe((response) => {
      if (response.success) {
        this.postCreatedSuccess = 'Post has been saved successfully !';
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
