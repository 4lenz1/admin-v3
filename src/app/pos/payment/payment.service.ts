import { PosService } from './../pos.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Payment } from './payment.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  private paymentList = [new Payment(0, 'cash', this.posService.getTotalPrice(), {})];

  totalPrice;
  constructor(private posService: PosService) { }

  btnConfirmDisabledChanged: EventEmitter<boolean> = new EventEmitter();
  paymentListChanged = new EventEmitter();

  getPaymentList() {
    return this.paymentList;
  }

  addPayment(payment: Payment) {
    this.paymentList.push(payment);
    this.paymentListChanged.next(this.paymentList);
    console.log(this.paymentList);
  }

  deletePayment(id: number) {
    this.paymentList = this.paymentList.filter(x =>
      x.id !== id
    );
    this.paymentListChanged.next(this.paymentList);
    console.log(this.paymentList);
  }

  setConfirmBtn() {

  }


  setPayment(payment: Payment) {
    const newPaymentList = this.paymentList.map((item) => {
      if (item.id === payment.id) {
        const obj = Object.assign({}, item, payment);
        return obj;
      }
      return item;
    });

    this.paymentList = newPaymentList;
    // this.paymentListChanged.next(this.paymentList);
    console.log(this.paymentList);
  }

  updatePayMethod(){

  }

  updateTotalPrice(payment: Payment) {
    this.setPayment(payment);
    this.setPaidTotalPrice();

  }

  setPaidTotalPrice() {
    this.totalPrice = 0;
    this.paymentList.forEach(x => {
      this.totalPrice += x.payPrice;
    });
    console.log(this.totalPrice);
    this.setBtnConfirm();
    this.posService.setPaidMoney(this.totalPrice);
  }

  setBtnConfirm() {
    const shouldPay = this.posService.getTotalPrice();
    if (this.totalPrice >= shouldPay) {
      this.btnConfirmDisabledChanged.next(false);
    } else {
      this.btnConfirmDisabledChanged.next(true);
    }
  }
}
