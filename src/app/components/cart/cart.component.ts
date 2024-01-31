import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import Product from '../../type/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);
  cartItems!: Product[];
  ngOnInit() {
    this.cartService.cartItems$.subscribe((result) => {
      this.cartItems = result;
    });
    console.log(this.cartItems);
  }
  decreseQuantity(product: Product) {
    this.cartService.decreseQuantity(product);
  }
  increseQuantity(product: Product) {
    this.cartService.increseQuantity(product);
  }
  removeProduct(product: Product) {
    this.cartService.removerProduct(product);
  }
}
