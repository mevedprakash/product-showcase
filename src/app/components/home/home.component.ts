import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpService } from '../../services/http.service';
import Product from '../../type/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatInputModule, MatCardModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  httpService = inject(HttpService);
  products: Product[] = [];
  ngOnInit() {
    this.httpService.getProducts().subscribe((result) => {
      console.log(result);
      this.products = result;
    });
  }
}
