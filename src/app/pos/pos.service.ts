import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  private products = [
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
  paidMoneyChanged = new EventEmitter<number>();
  calculateMoneyChanged = new EventEmitter<number>();

  private paidMoney = 0;
  private totalPrice = 0;
  private isTaxSelected = false;
  // isRecipeSelected = false;
  private isPayMethodSelected = false;
  // private canCheckout = false;
  checkoutValidateChanged = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) { }


  setPaidMoney(value: number) {
    this.paidMoney = value;

    this.paidMoneyChanged.emit(this.paidMoney);
  }
  setTaxSelected(value: boolean) {
    this.isTaxSelected = value;
    this.setCanCheckOut();
  }
  setPayMethodSelected(value: boolean) {
    this.isPayMethodSelected = value;
    this.setCanCheckOut();
  }
  setCanCheckOut() {
    if (this.isTaxSelected
      && this.isPayMethodSelected
      && this.paidMoney >= this.totalPrice
      && this.totalPrice > 0) {
      this.checkoutValidateChanged.emit(true);
    } else {
      this.checkoutValidateChanged.emit(false);
    }
  }

  getOriginalTotalPrice() {
    // this.totalPrice = 0;
    let price = 0;
    this.products.forEach(x => {
      price += x.amount * x.unitPrice;
    });
    // console.log('total price', this.totalPrice)
    return price;
  }
  resetTotalPrice() {
    const price = this.getOriginalTotalPrice();
    this.setTotalPrice(price);
  }
  setTotalPrice(value: number) {

    this.totalPrice = value;
    console.log('total price be4 ' + this.totalPrice);
    this.setCanCheckOut();

    this.totalPricechanged.emit(this.totalPrice);
    console.log('total price after' + this.totalPrice);


  }




  getProductList() {
    return this.products.slice();
  }
  addProduct(product: Product) {
    const exist = this.products.find(arr => {
      return arr.id === product.id;
    });
    if (exist) {
      exist.amount++;
      const newProducts = this.products.map((item) => {
        if (item.id === exist.id) {
          const obj = Object.assign({}, item, exist);
          return obj;
        }
        return item;
      });
      this.products = newProducts;
    } else {
      this.products.push(product);
    }

    this.ProdcutsChanged.emit(this.products);
    this.totalPricechanged.emit(this.getOriginalTotalPrice());
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

    const price = this.getOriginalTotalPrice();
    this.totalPricechanged.emit(price);
    this.setTotalPrice(price);
  }

  deleteProduct(id: string) {
    this.products = this.products.filter(result =>
      result.id !== id);

    this.totalPricechanged.emit(this.getOriginalTotalPrice());
    this.ProdcutsChanged.emit(this.products);
  }

  // get product info by barcode
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

  // checkOut() {
  //   this.httpClient.post('')
  // }
}
