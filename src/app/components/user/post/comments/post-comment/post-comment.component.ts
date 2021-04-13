import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comments/comment.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent implements OnInit {
  submitted: boolean = false;
  loading: boolean = false;
  commentForm: FormGroup;
  @Input() postId: string;
  /**
   * Tell the comments component Hey, a new comment added by this comopnent
   */
  @Output() newCommentAdded = new EventEmitter<boolean>();

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
    this.loading = true;
    this.commentForm.patchValue({
      post_id: this.postId,
    });
    if (!this.commentForm.valid) {
      return;
    }
    this.commentService.commentOnPost(this.commentForm.value).subscribe(
      (response) => {
        if (response.success) {
          this.commentForm.reset();
          this.loading = false;
          this.newCommentAdded.emit(true);
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}
