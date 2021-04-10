import { EventEmitter, Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  // private products: Product;
  private products = [];

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

  constructor() { }


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

    console.log(this.isTaxSelected
      , this.isPayMethodSelected,
      this.totalPrice,
      this.paidMoney
      , this.paidMoney >= this.totalPrice
      , this.totalPrice > 0);

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

    return price;
  }

  // ONLY use in payment modal
  getTotalPrice() {
    return this.totalPrice;
  }
  resetTotalPrice() {
    const price = this.getOriginalTotalPrice();
    this.setTotalPrice(price);
  }
  setTotalPrice(value: number) {

    this.totalPrice = value;
    console.log(' set total price to : ' + this.totalPrice);
    this.setCanCheckOut();

    this.totalPricechanged.emit(this.totalPrice);
  }




  getProductList() {
    return this.products.slice();
  }
  addProduct(product: Product) {
    console.log('add product: ' + product.unitPrice);
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
    this.setTotalPrice(this.getOriginalTotalPrice());
    // this.totalPricechanged.emit();
  }
  updateProduct(product: Product) {
    const newProducts = this.products.map((item) => {
      if (item.id === product.id) {
        const obj = Object.assign({}, item, product);
        return obj;
      }
      return item;
    });
    this.products = newProducts;

    const price = this.getOriginalTotalPrice();
    // this.totalPricechanged.emit(price);
    this.setTotalPrice(price);
  }

  deleteProduct(id: string) {
    this.products = this.products.filter(result =>
      result.id !== id);

    // this.totalPricechanged.emit(this.getOriginalTotalPrice());
    this.setTotalPrice(this.getOriginalTotalPrice());
    this.ProdcutsChanged.emit(this.products);
  }

  getPaidMoney() {
    return this.paidMoney;
  }

}
