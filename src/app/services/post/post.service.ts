import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  /**
   * This function gets all the posts from server
   * @returns Observable
   */
  getAllPosts(currentPage: number): Observable<any> {
    return this.http.get('posts?page=' + currentPage);
  }
  /**
   * This function creates or updates the post
   * @param post
   * @returns Observable
   */
  savePost(post: any): Observable<any> {
    return this.http.post('posts/save', post);
  }
  /**
   * This function gives the single post detail
   * @returns Observable
   */
  getPostDetail(postId: string): Observable<any> {
    return this.http.get('posts/detail/' + postId);
  }
  /**
   * Marks favorite un favorite
   * @param status
   * @param post_id
   * @returns Observable
   */
  markFavoriteUnFavorite(status: number, post_id: number): Observable<any> {
    return this.http.post('favorites/mark', { status, post_id });
  }
  /**
   * This function gets current user favorite posts
   * @returns favorites
   */
  getFavorites(): Observable<any> {
    return this.http.get('favorites/mine');
  }
}
