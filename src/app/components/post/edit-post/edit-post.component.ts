import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationHelper } from 'src/app/helper/validations.helper';
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
  choosedFileName: string = 'Choose file';
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private validationHelper: ValidationHelper
  ) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

    /**
     * Initialize post update form
     */
    this.editPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      tags: ['', Validators.required],
      feature_image: ['', Validators.nullValidator],
      content: ['', Validators.required],
      post_id: [''],
    });
    this.loadPostDetail();
  }
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [feature_image] = event.target.files;
      reader.readAsDataURL(feature_image);

      reader.onload = () => {
        this.editPostForm.patchValue({
          feature_image: reader.result,
        });
        // console.log(reader.result);
        this.choosedFileName = feature_image.name;
      };
    }
  }

  updatePost(): void {
    this.submitted = true;
    console.log(this.editPostForm.status);
    if (!this.editPostForm.valid) {
      return;
    }

    this.editPostForm.patchValue({
      post_id: this.postId,
    });
    this.postService.savePost(this.editPostForm.value).subscribe(
      (response) => {
        if (response.success) {
          this.postUpdateSuccess = response.message;
          setTimeout(() => {
            this.router.navigate(['/posts']);
          }, 1000);
        }
      },
      (errorResponse) => {
        this.validationHelper.showValidationErrors(
          this.editPostForm,
          errorResponse
        );
      }
    );
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
        const post = response.data.post;
        this.editPostForm.patchValue({
          title: post.title,
          tags: post.tags,
          content: post.content,
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
