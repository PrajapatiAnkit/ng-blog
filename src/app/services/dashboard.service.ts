import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  /**
   * This function returns the dashboard counts and other details
   * @returns json
   */
  getDashboard(): Observable<any> {
    return this.http.get('dashboard');
  }
}
