import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  loading: boolean = true;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }
  /**
   * This function gets all from posts from server
   */
  getAllPosts() {
    this.postService.getAllPosts().subscribe((response) => {
      this.posts = response.data;
      this.loading = false;
    });
  }
}
