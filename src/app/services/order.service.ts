import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Order } from '../type/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpClient=inject(HttpClient);
  constructor() { }

  addOrder(order:Order){
    return this.httpClient.post("http://localhost:3000/orders",order)
  }
}
