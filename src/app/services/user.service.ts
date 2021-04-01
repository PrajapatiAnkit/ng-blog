import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  updateProfile(user: Object): Observable<any> {
    return this.http.patch('/api/profile/update', user);
  }
  getProfile(): Observable<any> {
    return this.http.get('/api/profile');
  }
}
