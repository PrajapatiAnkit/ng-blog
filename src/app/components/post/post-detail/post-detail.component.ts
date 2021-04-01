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
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.postService.getPostDetail(this.postId).subscribe((response) => {
      this.post = response.data;
      this.postTags = this.post.tags.split(',');
      this.loading = false;
    });
  }
}
