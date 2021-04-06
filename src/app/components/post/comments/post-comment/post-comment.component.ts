import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comments/comment.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent implements OnInit {
  postId: String;
  submitted: boolean = false;
  commentForm: FormGroup;
  @Input() currentPostId: String;
  commentAdded: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      post_id: [''],
    });
  }
  /**
   * This function add a new comment for a post
   * @returns void
   */
  commentOnPost(): void {
    this.submitted = true;
    this.commentForm.patchValue({
      post_id: this.currentPostId,
    });
    if (!this.commentForm.valid) {
      return;
    }
    this.commentService.commentOnPost(this.commentForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}
