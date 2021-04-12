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
  keyword: any;
  favoritesPosts: [] = [];
  totalItems: number;
  pagination: any;
  paginationLoader: boolean = false;

  constructor(private postService: PostService) {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: this.totalItems,
    };
    console.log(this.pagination);
  }

  ngOnInit(): void {
    this.getAllPosts();
  }
  /**
   * This function gets all from posts from server
   */
  getAllPosts() {
    this.postService
      .getAllPosts(this.pagination.currentPage)
      .subscribe((response) => {
        this.posts = response.data.posts.data;
        this.favoritesPosts = response.data.favorites;
        this.loading = false;
        this.paginationLoader = false;
        this.pagination.totalItems = response.data.posts.total;
      });
  }
  /**
   * Pages changed when navigate the pagination
   * @param event
   */
  pageChanged(event) {
    this.paginationLoader = true;
    this.pagination.currentPage = event;
    this.getAllPosts();
  }
}
