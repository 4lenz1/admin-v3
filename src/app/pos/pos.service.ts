import { NodeWithI18n } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  products = [
    new Product(
      '1',
      'Noble Audio Sultan / Limited Edition on Damascus / 24K GOLD / 4.4mm',
      2,
      2000
    ),
    new Product(
      '2',
      '1000xm4',
      2,
      2000
    ), new Product(
      '3'
      , '1000xm4',
      2,
      2000
    ),
  ];
  totalPricechanged = new EventEmitter<number>();
  ProdcutsChanged = new EventEmitter<Product[]>();
  totalPrice = 0;
  constructor() { }

  getOriginalTotalPrice() {
    this.totalPrice = 0;
    this.products.forEach(x => {
      this.totalPrice += x.amount * x.unitPrice;
    });
    // console.log('total price', this.totalPrice)
    return this.totalPrice;
  }
  setTotalPrice(value: number) {
    this.totalPrice = value;
  }

  getProductList() {
    return this.products.slice();
  }

  setProduct(product: Product) {
    const newProducts = this.products.map((item) => {
      if (item.id === product.id) {
        const obj = Object.assign({}, item, product);
        return obj;
      }
      return item;
    });
    this.products = newProducts;

    this.totalPricechanged.emit(this.getOriginalTotalPrice());
  }

  deleteProduct(id: string) {
    this.products = this.products.filter(result =>
      result.id !== id);

    this.totalPricechanged.emit(this.getOriginalTotalPrice());
    this.ProdcutsChanged.emit(this.products);
  }

  //get product info by barcode
  getProductByBarCode(value: string) {
    //   for test now
    this.products.unshift(new Product(
      (Math.random() * +value).toFixed(0).toString(),
      'TEST Product',
      1,
      3000
    ));
    this.totalPricechanged.emit(this.getOriginalTotalPrice());
    this.ProdcutsChanged.emit(this.products);
  }

}
