import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  @Input() postId: number;
  @Input() status: number;

  constructor(private postService: PostService) {}

  ngOnInit(): void {}
  /**
   * Marks favorite un favorite the post for a user
   * @param status
   * @param postId
   */
  markFavoriteUnFavorite(status: number, postId: number) {
    this.postService.markFavoriteUnFavorite(status, postId).subscribe(
      (response) => {
        if (response.success) {
          if (status == 2) {
            this.status = 1;
          } else {
            this.status = 2;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
