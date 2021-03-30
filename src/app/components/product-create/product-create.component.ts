import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: '',
    category: '',
    description: '',
  };
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}
  onCreateProduct() {
    console.log(this.product);
    this.productService.createProduct(this.product).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/products']);
    });
  }
}
