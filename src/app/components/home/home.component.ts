import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpService } from '../../services/http.service';
import Product from '../../type/product';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    ProductCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchControl = new FormControl('');
  httpService = inject(HttpService);
  products: Product[] = [];
  filteredProducts: Product[] = [];
  ngOnInit() {
    this.httpService.getProducts().subscribe((result) => {
      console.log(result);
      this.products = result;
      this.filteredProducts = this.products;
    });
    this.searchControl.valueChanges.subscribe((result) => {
      console.log(result);
      if (result) {
        this.filteredProducts = this.products.filter(
          (x) =>
            x.name.toLowerCase().includes(result.toLowerCase()) ||
            x.brand.toLowerCase().includes(result.toLowerCase())
        );
      } else {
        this.filteredProducts = this.products;
      }
    });
  }
}
