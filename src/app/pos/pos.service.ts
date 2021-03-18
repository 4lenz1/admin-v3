import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  products = [
    new Product(
      '1000xm4',
      2,
      2000
    ),
    new Product(
      '1000xm4',
      2,
      2000
    ), new Product(
      '1000xm4',
      2,
      2000
    ),
  ];
  totalPrice = 0;
  constructor() { }

  getTotalPrice() {
    this.products.forEach(x => {
      this.totalPrice += x.amount * x.unitPrice;
    });
    console.log('total price', this.totalPrice)
    return this.totalPrice;
  }

  getProductList() {
    return this.products.slice();
  }
}
