import { Component, OnInit } from '@angular/core';
import { CURRENT_PAGE, ITEMS_PER_PAGE } from 'src/app/constants/app-constants';
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
      currentPage: CURRENT_PAGE,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: this.totalItems,
    };
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
        this.totalItems = response.data.posts.total;
      });
  }
  /**
   * Custom event received from pagination component,
   * Pages changed when navigate the pagination
   * @param event
   */

  currentPageChanged(event) {
    this.paginationLoader = true;
    this.pagination.currentPage = event;
    this.getAllPosts();
  }
}
