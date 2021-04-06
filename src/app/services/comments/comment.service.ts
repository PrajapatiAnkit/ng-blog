import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  /**
   * This function loads the comments for a post
   * @param postId
   * @returns Observable
   */
  loadComments(postId): Observable<any> {
    return this.http.get('/api/comments/' + postId);
  }
  /**
   * This function posts a new comment on a post
   * @param comment
   * @returns Observable
   */
  commentOnPost(comment: Object): Observable<any> {
    return this.http.post('/api/comments/add', comment);
  }
}
