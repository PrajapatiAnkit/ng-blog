import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading: boolean = true;
  thumbnailUrl: string;
  favoritesPosts: [] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPostDetail();
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
        this.favoritesPosts = responseData.favorites;
      },
      (error) => {
        if (error.status === 404) {
          this.router.navigate(['/posts']);
        }
      }
    );
  }
}
