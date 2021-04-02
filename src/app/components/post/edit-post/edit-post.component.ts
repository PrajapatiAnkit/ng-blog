import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  editPostForm: FormGroup;
  submitted: boolean = false;
  postUpdateSuccess: string = '';
  postId: string;
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

    /**
     * Initialize post update form
     */
    this.editPostForm = this.formBuilder.group({
      postTitle: ['', Validators.required],
      postTags: ['', Validators.required],
      postContent: ['', Validators.required],
    });
    this.loadPostDetail();
  }
  updatePost(): void {
    this.submitted = true;
    /**
     * If form is not valid, then stop here
     */
    if (!this.editPostForm.valid) {
      return;
    }
    const postUpdatedData = {
      title: this.postForm.postTitle.value,
      tags: this.postForm.postTags.value,
      content: this.postForm.postContent.value,
      post_id: this.postId,
    };
    this.postService.savePost(postUpdatedData).subscribe((response) => {
      if (response.success) {
        this.postUpdateSuccess = response.message;
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
    return this.editPostForm.controls;
  }
  /**
   * Load post detail and prefill the form
   */
  loadPostDetail() {
    this.postService.getPostDetail(this.postId).subscribe(
      (response) => {
        const post = response.data;
        this.editPostForm.patchValue({
          postTitle: post.title,
          postTags: post.tags,
          postContent: post.content,
        });
      },
      (errorResponse) => {
        if (errorResponse.status === 404) {
          this.router.navigate(['/posts']);
        }
      }
    );
  }
}
