import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public logggedInUserSubject: BehaviorSubject<any>;
  public loggedInUser: any;
  public loggedIn: boolean;
  constructor(private http: HttpClient) {
    /**
     * Inititalize subject from localstorage of loggedIn user exists
     */
    const currentUser = localStorage.getItem('currentUser');
    this.logggedInUserSubject = new BehaviorSubject(JSON.parse(currentUser));
    this.loggedInUser = this.logggedInUserSubject.asObservable();
  }
  /**
   * This service function authenticates the login
   * @param email
   * @param password
   * @returns json
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', { email, password }).pipe(
      map((response: any) => {
        const user = response.data;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.logggedInUserSubject.next(user);
        return response;
      })
    );
  }
  /**
   * This property returns the user loggedin status
   */
  get isLoggedIn() {
    return this.logggedInUserSubject.value.token != '' ? true : false;
  }
  /**
   * This function logouts the user from service side
   * @returns json
   */
  logout(): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.get('/api/user/logout', { headers: headers }).pipe(
      map((response) => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.logggedInUserSubject.next(null);
        return response;
      })
    );
  }
}
