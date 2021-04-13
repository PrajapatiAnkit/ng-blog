import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-favorite-posts',
  templateUrl: './favorite-posts.component.html',
  styleUrls: ['./favorite-posts.component.css'],
})
export class FavoritePostsComponent implements OnInit {
  loading: boolean = true;
  favoritePosts: Post[];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }
  loadFavorites() {
    this.postService.getFavorites().subscribe((response) => {
      this.favoritePosts = response.data;
      this.loading = false;
      console.log(this.favoritePosts);
    });
  }
}
