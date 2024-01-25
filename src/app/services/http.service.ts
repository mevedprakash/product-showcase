import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Product from '../type/product';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);
  constructor() {
  }

  getProducts(){
    return this.http.get<Product[]>("http://localhost:3000/products");
  }
}
