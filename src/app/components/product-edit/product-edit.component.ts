import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}
  product: Product = null;
  productId: string;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService
      .getProductDetail(this.productId)
      .subscribe((response) => {
        this.product = response;
      });
  }
  onUpdateProduct() {
    this.productService
      .updateProduct(this.productId, this.product)
      .subscribe((response) => {
        this.router.navigate(['/products']);
      });
  }
}
