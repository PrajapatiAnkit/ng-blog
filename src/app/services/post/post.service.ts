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
   * @returns json
   */
  getAllPosts(): Observable<any> {
    return this.http.get('/api/posts');
  }
  /**
   * This function creates or updates the post
   * @param post
   * @returns json
   */
  savePost(post: any): Observable<any> {
    return this.http.post('/api/posts/save', post);
  }
  /**
   * This function gives the single post detail
   * @returns json
   */
  getPostDetail(postId: string): Observable<any> {
    return this.http.get('/api/posts/detail/' + postId);
  }
}
