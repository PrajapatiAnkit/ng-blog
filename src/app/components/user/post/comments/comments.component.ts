import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/post.model';
import { CommentService } from 'src/app/services/comments/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() postId;
  comments: Comment[] = [];
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments(this.postId);
  }
  /**
   * This function loads the comments for a post
   * @param postId
   */
  loadComments(postId: string) {
    this.commentService.loadComments(postId).subscribe((response) => {
      this.comments = response.data;
    });
  }
  /**
   * This is not a normal function this is custom event received by PostCommentComponent
   * @param event
   */
  refreshComments(event) {
    console.log('refreshing comments...', event);
    this.loadComments(this.postId);
  }
}
