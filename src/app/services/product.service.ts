import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:3000/products/';
  createProduct(product: Product): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }
  getAllProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getProductDetail(id: string): Observable<any> {
    return this.http.get(this.baseUrl + id);
  }
  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}`, product);
  }
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
