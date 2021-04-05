import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.postService.getPostDetail(this.postId).subscribe((response) => {
      const responseData = response.data;
      this.post = responseData.post;
      this.postTags = this.post.tags.split(',');
      if (this.post.featured_image) {
        this.thumbnailUrl =
          responseData.thumbnail_path + this.post.featured_image;
      }

      this.loading = false;
    });
  }
}
