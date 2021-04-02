import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public logggedInUserSubject: BehaviorSubject<any>;
  public loggedInUser: any;
  public loggedIn: boolean;
  constructor(private http: HttpClient, private router: Router) {
    /**
     * Inititalize subject from localstorage of loggedIn user exists
     */
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      this.router.navigate(['']);
    }
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
    return this.http.post('/api/auth/login', { email, password }).pipe(
      map((response: any) => {
        if (response.success) {
          const user = response.data;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.logggedInUserSubject.next(user);
        } else {
          localStorage.removeItem('currentUser');
          this.logggedInUserSubject.next(null);
        }
        return response;
      })
    );
  }
  /**
   * This function registers new user
   * @param userData
   * @returns json
   */
  signUp(userData: Object): Observable<any> {
    return this.http.post('/api/auth/register', userData);
  }
  /**
   * This property returns the user loggedin status
   */
  get isLoggedIn() {
    return this.logggedInUserSubject.value.token != '' ? true : false;
  }
  /**
   * This is a helper function returns the token
   * @returns string
   */
  public getToken(): string {
    return this.logggedInUserSubject.value
      ? this.logggedInUserSubject.value.token
      : '';
  }
  /**
   * This function clears the Token when required
   */
  public removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.logggedInUserSubject.next(null);
  }

  /**
   * This function logouts the user from service side
   * @returns json
   */
  logout(): Observable<any> {
    return this.http.get('/api/auth/logout').pipe(
      map((response) => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.logggedInUserSubject.next(null);
        return response;
      })
    );
  }
  /**
   * This is a helper function to set the user data to local storage
   * @param user
   */
  setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
