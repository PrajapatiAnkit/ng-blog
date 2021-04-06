import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/models/post.model';
import { CommentService } from 'src/app/services/comments/comment.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postId: string;
  post: any;
  postTags: [] = [];
  comments: Comment[] = [];
  loading: boolean = true;
  thumbnailUrl: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPostDetail();
    this.loadComments(this.postId);
  }
  /**
   * Load the post detail
   */
  getPostDetail() {
    this.postService.getPostDetail(this.postId).subscribe(
      (response) => {
        const responseData = response.data;
        this.post = responseData.post;
        this.postTags = this.post.tags.split(',');
        if (this.post.featured_image) {
          this.thumbnailUrl = this.post.featured_image;
        }
        this.loading = false;
      },
      (error) => {
        if (error.status == 404) {
          this.router.navigate(['/posts']);
        }
      }
    );
  }
  /**
   * This function loads the comments for a post
   * @param postId
   */
  loadComments(postId: String) {
    this.commentService.loadComments(postId).subscribe((response) => {
      this.comments = response.data;
    });
  }
}
