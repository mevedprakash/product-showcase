import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../services/http.service';
import Product from '../../type/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  builder = inject(FormBuilder);
  productForm = this.builder.group({
    brand: ['', [Validators.required]],
    image: [''],
    currentPrice: [''],
    standardPrice: [''],
    discount: [''],
    name: ['', [Validators.required]],
  });
  httpService = inject(HttpService);
  router = inject(Router);
  submit() {
    let formValues = this.productForm.value as Product;
    console.log(formValues);
    console.log('form valid', this.productForm.valid);
    if (this.productForm.invalid) {
      alert('Please prodvide required filed');
      return;
    }
    this.httpService.addProduct(formValues).subscribe(() => {
      alert('product added');
      this.router.navigateByUrl('/');
    });
  }
}
