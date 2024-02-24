import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import Product, { Order } from '../../type/product';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);
  cartItems!: Product[];
  orderService=inject(OrderService);
  router=inject(Router);
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

  get totalPrice() {
    let sum = 0;
    for (let product of this.cartItems) {
      sum += +product.standardPrice * +product.quantity!;
    }
    return sum;
  }
  get totalDiscount() {
    return this.totalPrice - this.totalAmount;
  }
  get totalAmount() {
    let sum = 0;
    for (let product of this.cartItems) {
      sum += +product.currentPrice * +product.quantity!;
    }
    return sum;
  }
  placeOrder() {
    console.log('order placed');
    let order:Order={
      orderDate:new Date(),
      items:this.cartItems
    }
   this.orderService.addOrder(order).subscribe((result=>{
   this.cartService.clearCart();
   this.router.navigateByUrl("/");
   }));
  }
}
