import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import Product from '../../type/product';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  httpService = inject(HttpService);
  router = inject(Router);
  product!: Product;
  ngOnInit() {
    let productId = this.route.snapshot.params['id'];
    console.log(productId);
    this.httpService.getProduct(productId).subscribe((result) => {
      this.product = result;
    });
  }
  edit() {
    this.router.navigateByUrl('product/' + this.product.id);
  }
  delete() {
    this.httpService.deleteProduct(this.product.id!).subscribe(() => {
      alert('product deleted');
      this.router.navigateByUrl('/');
    });
  }
}
